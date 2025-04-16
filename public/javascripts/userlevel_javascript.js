document.addEventListener("DOMContentLoaded", () => {

  // CREATE OR UPDATE
  document.getElementById("submitUserlevel").addEventListener("click", async () => {
    const id = document.getElementById("hidden_id_userlevel").value;
    const nama_level = document.getElementById("nama_level").value;

  // Tentukan URL dan method berdasarkan id
  const isUpdate = id !== "";
  const url = isUpdate ? `/api/userlevel/${id}` : `/api/userlevel`;
  const method = isUpdate ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama_level,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        swal("Berhasil!", data.message || "Userlevel berhasil ditambahkan", "success");
        setTimeout(() => location.reload(), 1500);
      } else {
        swal("Gagal!", data.message || "Terjadi kesalahan saat menyimpan data", "error");
      }
    } catch (err) {
      swal("Error!", "Gagal menghubungi server", "error");
    }
  });

  // MENGISI VALUE FORM (EDIT)
  document.querySelectorAll(".userlevelEdit").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-id");

      try {
        const res = await fetch(`/api/userlevel/${id}`);
        const data = await res.json();

        if (data.status === "success") {
          const userlevel = data.data;

          document.getElementById("hidden_id_userlevel").value = userlevel.id_level;
          document.getElementById("nama_level").value = userlevel.nama_level;

          const modal = new bootstrap.Modal(document.getElementById("userlevelModal"));
          modal.show();
        } else {
          swal("Gagal", "Userlevel tidak ditemukan", "error");
        }
      } catch (err) {
        swal("Error", "Gagal menghubungi server", "error");
      }
    });
  });

  // RESET SAAT MENUTUP MODAL
  document.getElementById('userlevelModal').addEventListener('hidden.bs.modal', function () {
      document.getElementById("userlevelForm").reset();
      document.getElementById("hidden_id_userlevel").value = '';
  });
    

  // DELETE
  document.querySelectorAll(".userlevelDelete").forEach((btn) => {
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
          const res = await fetch(`/api/userlevel/${id}`, {
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