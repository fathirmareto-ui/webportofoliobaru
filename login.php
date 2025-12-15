<?php
session_start();
include "koneksi.php";

if (isset($_POST['login'])) {
    $nim_nidn = mysqli_real_escape_string($conn, $_POST['nim_nidn']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    // Cek apakah akun ada
    $sql = "SELECT * FROM users WHERE nim_nidn='$nim_nidn' LIMIT 1";
    $result = mysqli_query($conn, $sql);

    if (!$result) {
        die("Query Error: " . mysqli_error($conn));
    }

    if (mysqli_num_rows($result) === 1) {
        $row = mysqli_fetch_assoc($result);

        $db_pass = $row['password'];

        // Menangani 2 kemungkinan password:
        // 1. sudah di-hash
        // 2. belum di-hash
        $password_valid =
            password_verify($password, $db_pass) ||   
            $password === $db_pass;                    

        if ($password_valid) {
            // Set session
            $_SESSION['role'] = $row['role'];
            $_SESSION['nama'] = $row['nama'];
            $_SESSION['id'] = $row['id'];

            // Redirect sesuai role
            if ($row['role'] == 'mahasiswa') {
                header("Location: dashboard_mahasiswa.php");
                exit();
            } elseif ($row['role'] == 'dosen') {
                header("Location: dashboard_dosen.php");
                exit();
            } else {
                header("Location: index.php");
                exit();
            }

        } else {
            $error = "Password salah!";
        }

    } else {
        $error = "Akun tidak ditemukan!";
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="stylelogreg.css">
  <title>Login</title>
</head>
<body>
    <section class="hero" id="home">
    <div class="overlay"></div>
    <div class="glass">

<div class="container">
  <h2>Login</h2>

  <?php if(!empty($error)) echo "<p style='color:red'>$error</p>"; ?>

  <form method="POST">
    <input type="text" name="nim_nidn" placeholder="Masukkan NIM / NIDN" required>
    <input type="password" name="password" placeholder="Password" required>

    <button type="submit" name="login">Login</button>

    <p>Belum punya akun? <a href="register.php">Daftar</a></p>
  </form>
</div>

</body>
</html>
