<?php
// Database configuration
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'capital_lone';

// Create connection (for demonstration, adjust as needed)
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    // For demo purposes, we'll continue without database
    // In production, you might want to handle this differently
    error_log("Database connection failed: " . $conn->connect_error);
}

// Function to sanitize input
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Function to validate email
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Function to validate phone
function validatePhone($phone) {
    return preg_match('/^[0-9]{10}$/', $phone);
}

// Function to send email notification
function sendEmailNotification($data) {
    $to = 'info@capitallone.com'; // Replace with actual email
    $subject = 'New Loan Application - ' . ucfirst($data['loan_type']);
    
    $message = "
    <html>
    <head>
        <title>New Loan Application</title>
    </head>
    <body>
        <h2>New Loan Application Details</h2>
        <p><strong>Loan Type:</strong> " . ucfirst($data['loan_type']) . "</p>
        <p><strong>Full Name:</strong> " . $data['name'] . "</p>
        <p><strong>Email:</strong> " . $data['email'] . "</p>
        <p><strong>Phone:</strong> " . $data['phone'] . "</p>
        <p><strong>Loan Amount:</strong> ₹" . number_format($data['amount']) . "</p>
        <p><strong>Application Date:</strong> " . date('Y-m-d H:i:s') . "</p>
        
        <hr>
        <p><small>This is an automated message from Capital Lone Loan Application System.</small></p>
    </body>
    </html>
    ";
    
    // Headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: noreply@capitallone.com' . "\r\n";
    
    // In production, uncomment this line to actually send emails
    // mail($to, $subject, $message, $headers);
    
    // For demo purposes, we'll just log the email
    error_log("Email would be sent to: $to with subject: $subject");
    return true;
}

// Function to save to database
function saveToDatabase($data, $conn) {
    if ($conn->connect_error) {
        return false;
    }
    
    // Create table if it doesn't exist
    $createTableSQL = "
    CREATE TABLE IF NOT EXISTS loan_applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        loan_type VARCHAR(50) NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        loan_amount DECIMAL(12,2) NOT NULL,
        application_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        status ENUM('pending', 'under_review', 'approved', 'rejected') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    
    if (!$conn->query($createTableSQL)) {
        error_log("Error creating table: " . $conn->error);
        return false;
    }
    
    // Insert application
    $stmt = $conn->prepare("INSERT INTO loan_applications (loan_type, full_name, email, phone, loan_amount) VALUES (?, ?, ?, ?, ?)");
    if ($stmt === false) {
        error_log("Error preparing statement: " . $conn->error);
        return false;
    }
    
    $stmt->bind_param("ssssd", $data['loan_type'], $data['name'], $data['email'], $data['phone'], $data['amount']);
    
    if ($stmt->execute()) {
        $stmt->close();
        return true;
    } else {
        error_log("Error executing statement: " . $stmt->error);
        $stmt->close();
        return false;
    }
}

// Function to generate application ID
function generateApplicationId() {
    return 'TC' . date('Y') . strtoupper(substr(md5(uniqid()), 0, 8));
}

// Main processing
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Set response header
    header('Content-Type: application/json');
    
    // Sanitize and validate inputs
    $name = sanitizeInput($_POST['name']);
    $email = sanitizeInput($_POST['email']);
    $phone = sanitizeInput($_POST['phone']);
    $amount = sanitizeInput($_POST['amount']);
    $loanType = sanitizeInput($_POST['loan_type']);
    
    // Validation
    $errors = [];
    
    if (empty($name)) {
        $errors[] = "Name is required";
    } elseif (strlen($name) < 3 || strlen($name) > 100) {
        $errors[] = "Name must be between 3 and 100 characters";
    }
    
    if (empty($email)) {
        $errors[] = "Email is required";
    } elseif (!validateEmail($email)) {
        $errors[] = "Invalid email format";
    }
    
    if (empty($phone)) {
        $errors[] = "Phone number is required";
    } elseif (!validatePhone($phone)) {
        $errors[] = "Phone number must be 10 digits";
    }
    
    if (empty($amount)) {
        $errors[] = "Loan amount is required";
    } elseif (!is_numeric($amount) || $amount < 10000 || $amount > 10000000) {
        $errors[] = "Loan amount must be between ₹10,000 and ₹1,00,00,000";
    }
    
    if (empty($loanType)) {
        $errors[] = "Loan type is required";
    }
    
    // If there are errors, return them
    if (!empty($errors)) {
        echo json_encode([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $errors
        ]);
        exit;
    }
    
    // Prepare data
    $applicationData = [
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'amount' => floatval($amount),
        'loan_type' => $loanType,
        'application_id' => generateApplicationId()
    ];
    
    // Save to database
    $dbSaved = saveToDatabase($applicationData, $conn);
    
    // Send email notification
    $emailSent = sendEmailNotification($applicationData);
    
    // Log the application
    $logMessage = sprintf(
        "New loan application: %s | %s | %s | %s | ₹%s | %s | DB: %s | Email: %s",
        $applicationData['application_id'],
        $applicationData['name'],
        $applicationData['email'],
        $applicationData['phone'],
        number_format($applicationData['amount']),
        $applicationData['loan_type'],
        $dbSaved ? 'Success' : 'Failed',
        $emailSent ? 'Success' : 'Failed'
    );
    error_log($logMessage);
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Application submitted successfully!',
        'data' => [
            'application_id' => $applicationData['application_id'],
            'name' => $applicationData['name'],
            'loan_type' => ucfirst($applicationData['loan_type']),
            'amount' => number_format($applicationData['amount']),
            'next_steps' => [
                'Our team will contact you within 24 hours',
                'Keep your documents ready for verification',
                'Application ID: ' . $applicationData['application_id']
            ]
        ]
    ]);
    
} else {
    // Not a POST request
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
}

// Close database connection if it exists
if (isset($conn) && $conn->connect_error === false) {
    $conn->close();
}
?>
