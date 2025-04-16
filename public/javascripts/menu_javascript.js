document.addEventListener("DOMContentLoaded", () => {

  // CREATE OR UPDATE
  document.getElementById("submitMenuBtn").addEventListener("click", async () => {
    const id = document.getElementById("hidden_id_menu").value;
    const nama_menu = document.getElementById("nama_menu").value;
    const link = document.getElementById("link").value;
    const icon = document.getElementById("icon").value;
    const urutan = document.getElementById("urutan").value;
    const is_active = document.getElementById("is_active").value;

  // Tentukan URL dan method berdasarkan id
  const isUpdate = id !== "";
  const url = isUpdate ? `/api/menu/${id}` : `/api/menu`;
  const method = isUpdate ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama_menu,
          link,
          icon,
          urutan: parseInt(urutan),
          is_active
        }),
      });

      const data = await res.json();

      if (res.ok) {
        swal("Berhasil!", data.message || "Menu berhasil ditambahkan", "success");
        setTimeout(() => location.reload(), 1500);
      } else {
        swal("Gagal!", data.message || "Terjadi kesalahan saat menyimpan data", "error");
      }
    } catch (err) {
      swal("Error!", "Gagal menghubungi server", "error");
    }
  });

  // MENGISI VALUE FORM (EDIT)
  document.querySelectorAll(".menuEdit").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-id");
      console.log("berhasil");

      try {
        const res = await fetch(`/api/menu/${id}`);
        const data = await res.json();
        console.log(data);

        if (data.status === "success") {
          const menu = data.data;
          console.log(menu.nama_menu);

          document.getElementById("hidden_id_menu").value = menu.id_menu;
          document.getElementById("nama_menu").value = menu.nama_menu;
          document.getElementById("link").value = menu.link;
          document.getElementById("icon").value = menu.icon;
          document.getElementById("urutan").value = menu.urutan;
          document.getElementById("is_active").value = menu.is_active;

          const modal = new bootstrap.Modal(document.getElementById("menuModal"));
          modal.show();
        } else {
          swal("Gagal", "Menu tidak ditemukan", "error");
        }
      } catch (err) {
        swal("Error", "Gagal menghubungi server", "error");
      }
    });
  });

  // RESET SAAT MENUTUP MODAL
  document.getElementById('menuModal').addEventListener('hidden.bs.modal', function () {
      document.getElementById("menuForm").reset();
      document.getElementById("hidden_id_menu").value = '';
  });
    

  // DELETE
  document.querySelectorAll(".menuDelete").forEach((btn) => {
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
          const res = await fetch(`/api/menu/${id}`, {
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