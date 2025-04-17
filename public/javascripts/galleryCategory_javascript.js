document.addEventListener("DOMContentLoaded", () => {

    // CREATE OR UPDATE
    document.getElementById("submitGalleryCategoryBtn").addEventListener("click", async () => {
      const id = document.getElementById("hidden_id_category").value;
      const name = document.getElementById("name").value;
      const slug = document.getElementById("slug").value;
  
    // Tentukan URL dan method berdasarkan id
    const isUpdate = id !== "";
    const url = isUpdate ? `/api/galleries/galleryCategory/${id}` : `/api/galleries/galleryCategory`;
    const method = isUpdate ? "PUT" : "POST";

      try {
        const res = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            slug
          }),
        });
  
        const data = await res.json();
  
        if (res.ok) {
          swal("Berhasil!", data.message || "Gallery Category berhasil ditambahkan", "success");
          setTimeout(() => location.reload(), 1500);
        } else {
          swal("Gagal!", data.message || "Terjadi kesalahan saat menyimpan data", "error");
        }
      } catch (err) {
        swal("Error!", "Gagal menghubungi server", "error");
      }
    });
  
    // MENGISI VALUE FORM (EDIT)
    document.querySelectorAll(".galleryCategoryEdit").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.preventDefault();
        const id = btn.getAttribute("data-id");
  
        try {
          const res = await fetch(`/api/galleries/galleryCategory/${id}`);
          const data = await res.json();
  
          if (data.status === "success") {
            const category = data.data;
  
            document.getElementById("hidden_id_category").value = category.id;
            document.getElementById("name").value = category.name;
            document.getElementById("slug").value = category.slug;
  
            const modal = new bootstrap.Modal(document.getElementById("galleryCategoryFormModal"));
            modal.show();
          } else {
            swal("Gagal", "Gallery Category tidak ditemukan", "error");
          }
        } catch (err) {
          swal("Error", "Gagal menghubungi server", "error");
        }
      });
    });

    // RESET SAAT MENUTUP MODAL
    document.getElementById('galleryCategoryFormModal').addEventListener('hidden.bs.modal', function () {
        document.getElementById("galleryCategoryForm").reset();
        document.getElementById("hidden_id_category").value = '';
    });
      
  
    // DELETE
    document.querySelectorAll(".galleryCategoryDelete").forEach((btn) => {
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
            const res = await fetch(`/api/galleries/galleryCategory/${id}`, {
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