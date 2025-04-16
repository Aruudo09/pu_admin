document.addEventListener("DOMContentLoaded", () => {

  // CREATE OR UPDATE
  document.getElementById("submitSubmenuBtn").addEventListener("click", async () => {
    const id = document.getElementById("hidden_id_submenu").value;
    const nama_submenu = document.getElementById("nama_submenu").value;
    const link = document.getElementById("link").value;
    const icon = document.getElementById("icon").value;
    const id_menu = document.getElementById("id_menu").value;
    const urutan = document.getElementById("urutan").value;
    const is_active = document.getElementById("is_active").value;

  // Tentukan URL dan method berdasarkan id
  const isUpdate = id !== "";
  const url = isUpdate ? `/api/submenu/${id}` : `/api/submenu`;
  const method = isUpdate ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama_submenu,
          link,
          icon,
          urutan: parseInt(urutan),
          is_active,
          id_menu
        }),
      });

      const data = await res.json();

      if (res.ok) {
        swal("Berhasil!", data.message || "Submenu berhasil ditambahkan", "success");
        setTimeout(() => location.reload(), 1500);
      } else {
        swal("Gagal!", data.message || "Terjadi kesalahan saat menyimpan data", "error");
      }
    } catch (err) {
      swal("Error!", "Gagal menghubungi server", "error");
    }
  });

  // MENGISI VALUE FORM (EDIT)
  document.querySelectorAll(".submenuEdit").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-id");
      console.log("berhasil");

      try {
        const res = await fetch(`/api/submenu/${id}`);
        const data = await res.json();
        console.log(data);

        if (data.status === "success") {
          const submenu = data.data;

          document.getElementById("hidden_id_submenu").value = submenu.id_submenu;
          document.getElementById("nama_submenu").value = submenu.nama_submenu;
          document.getElementById("link").value = submenu.link;
          document.getElementById("icon").value = submenu.icon;
          document.getElementById("id_menu").value = submenu.id_menu;
          document.getElementById("is_active").value = submenu.is_active;
          document.getElementById("urutan").value = submenu.urutan;

          const modal = new bootstrap.Modal(document.getElementById("submenuModal"));
          modal.show();
        } else {
          swal("Gagal", "Submenu tidak ditemukan", "error");
        }
      } catch (err) {
        swal("Error", "Gagal menghubungi server", "error");
      }
    });
  });

  // RESET SAAT MENUTUP MODAL
  document.getElementById('submenuModal').addEventListener('hidden.bs.modal', function () {
      document.getElementById("submenuForm").reset();
      document.getElementById("hidden_id_submenu").value = '';
  });
    

  // DELETE
  document.querySelectorAll(".submenuDelete").forEach((btn) => {
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
          const res = await fetch(`/api/submenu/${id}`, {
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