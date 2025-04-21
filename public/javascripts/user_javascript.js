$(document).ready(function() {

    // CREATE OR UPDATE
    document.getElementById("submitUserBtn").addEventListener("click", async () => {
      const id = document.getElementById("hidden_id_user").value;
      const fullname = document.getElementById("fullname").value;
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const id_level = document.getElementById("id_level").value;
      const is_active = document.getElementById("is_active").value;
      const app = document.getElementById("app").value;
  
    // Tentukan URL dan method berdasarkan id
    const isUpdate = id !== "";
    const url = isUpdate ? `/api/user/${id}` : `/api/user`;
    const method = isUpdate ? "PUT" : "POST";

      try {
        const res = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname,
            username,
            password,
            id_level: parseInt(id_level),
            is_active,
            app
          }),
        });
  
        const data = await res.json();
  
        if (res.ok) {
          swal("Berhasil!", data.message || "User berhasil ditambahkan", "success");
          setTimeout(() => location.reload(), 1500);
        } else {
          swal("Gagal!", data.message || "Terjadi kesalahan saat menyimpan data", "error");
        }
      } catch (err) {
        swal("Error!", "Gagal menghubungi server", "error");
      }
    });

      // MENGISI VALUE FORM (EDIT)
    document.querySelectorAll(".userEdit").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.preventDefault();
        const id = btn.getAttribute("data-id");
  
        try {
          const res = await fetch(`/api/user/${id}`);
          const data = await res.json();
          console.log(data);
  
          if (data.status === "success") {
            const user = data.data;
  
            document.getElementById("hidden_id_user").value = user.id;
            document.getElementById("fullname").value = user.fullname;
            document.getElementById("username").value = user.username;
            document.getElementById("password").value = user.password;
            document.getElementById("id_level").value = user.id_level;
            document.getElementById("is_active").value = user.is_active;
            document.getElementById("app").value = user.app;
  
            const modal = new bootstrap.Modal(document.getElementById("userFormModal"));
            modal.show();
          } else {
            swal("Gagal", "User tidak ditemukan", "error");
          }
        } catch (err) {
          swal("Error", "Gagal menghubungi server", "error");
        }
      });
    });

    // RESET SAAT MENUTUP MODAL
    document.getElementById('userFormModal').addEventListener('hidden.bs.modal', function () {
        document.getElementById("userForm").reset();
        document.getElementById("hidden_id_user").value = '';
    });

    // DELETE
    document.querySelectorAll(".userDelete").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const id = btn.getAttribute("data-id");
  
        swal({
          title: "Yakin ingin menghapus?",
          icon: "warning",
          buttons: ["Batal", "Ya, hapus!"],
          dangerMode: true,
        }).then(async (willDelete) => {
          if (willDelete) {
            const res = await fetch(`/api/user/${id}`, {
              method: "DELETE",
            });
  
            const data = await res.json();
  
            if (data.status === "success") {
              swal({
                icon: "success",
                title: "Terhapus!",
                text: data.message,
                timer: 1500,
                buttons: false,
              }).then(() => {
                location.reload();
              });
            } else {
              swal("Gagal!", data.message || "Terjadi kesalahan", "error");
            }
          }
        });
      });
    });

});