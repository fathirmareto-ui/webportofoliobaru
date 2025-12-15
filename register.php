<?php
include "koneksi.php";

if (isset($_POST['register'])) {

    // Aman dari SQL Injection
    $nama = mysqli_real_escape_string($conn, $_POST['nama']);
    $nim_nidn = mysqli_real_escape_string($conn, $_POST['nim_nidn']);
    $role = mysqli_real_escape_string($conn, $_POST['role']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    // Cek apakah NIM/NIDN sudah digunakan
    $check = mysqli_query($conn, "SELECT * FROM users WHERE nim_nidn='$nim_nidn' LIMIT 1");

    if (mysqli_num_rows($check) > 0) {
        $error = "NIM / NIDN sudah terdaftar!";
    } else {

        // Hash password agar login menggunakan password_verify bisa benar
        $password_hash = password_hash($password, PASSWORD_DEFAULT);

        // Simpan user baru
        $sql = "INSERT INTO users (nama, nim_nidn, password, role)
                VALUES ('$nama', '$nim_nidn', '$password_hash', '$role')";

        if (mysqli_query($conn, $sql)) {
            header("Location: login.php");
            exit();
        } else {
            $error = "Pendaftaran gagal, coba lagi.";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="stylelogreg.css">
  <title>Registrasi</title>
</head>
<body>

<div class="container">
  <h2>Registrasi</h2>

  <?php if(!empty($error)) echo "<p style='color:red'>$error</p>"; ?>

  <form method="POST">
    <input type="text" name="nama" placeholder="Nama Lengkap" required>
    <input type="text" name="nim_nidn" placeholder="NIM / NIDN" required>

    <select name="role" required>
      <option value="">-- Pilih --</option>
      <option value="mahasiswa">Mahasiswa</option>
      <option value="dosen">Dosen</option>
    </select>

    <input type="password" name="password" placeholder="Password" required>

    <button type="submit" name="register">Daftar</button>

    <p>Sudah punya akun? <a href="login.php">Login</a></p>
  </form>
</div>

</body>
</html>
