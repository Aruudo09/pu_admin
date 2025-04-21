document.addEventListener("DOMContentLoaded", () => {

  $('#galleries').DataTable({
    processing: true,
    serverSide: true,
    responsive: true,
    ajax: {
      url: '/api/galleries/datatables',
      type: 'GET'
    },
    columns: [
      { data: 'title' },
      { data: 'image_url' },
      { data: 'description' },
      { data: 'category_id' },
      { data: 'created_at' },
      {
        data: 'id',
        render: function (data) {
          return `
            <a href="#" class="btn btn-sm btn-primary galleryEdit" data-id="${data}">
              <i class="fa fa-edit"></i>
            </a>
            <a href="#" class="btn btn-sm btn-danger galleryDelete" data-id="${data}">
              <i class="fa fa-times"></i>
            </a>
          `;
        }
      }
    ]
  });
  

    // CREATE OR UPDATE
    document.getElementById("submitGalleryBtn").addEventListener("click", async () => {
      const id = document.getElementById("hidden_id").value;
      const title = document.getElementById("title").value;
      const image_url = document.getElementById("image_url").value;
      const description = document.getElementById("description").value;
      const category_id = document.getElementById("category_id").value;
  
    // Tentukan URL dan method berdasarkan id
    const isUpdate = id !== "";
    const url = isUpdate ? `/api/galleries/gallery/${id}` : `/api/galleries/gallery`;
    const method = isUpdate ? "PUT" : "POST";

      try {
        const res = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            image_url,
            description,
            category_id: parseInt(category_id),
          }),
        });
  
        const data = await res.json();
  
        if (res.ok) {
          swal("Berhasil!", data.message || "Gallery berhasil ditambahkan", "success");
          setTimeout(() => location.reload(), 1500);
        } else {
          swal("Gagal!", data.message || "Terjadi kesalahan saat menyimpan data", "error");
        }
      } catch (err) {
        swal("Error!", "Gagal menghubungi server", "error");
      }
    });
  
    // MENGISI VALUE FORM (EDIT)
    document.querySelectorAll(".galleryEdit").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.preventDefault();
        const id = btn.getAttribute("data-id");
  
        try {
          const res = await fetch(`/api/galleries/gallery/${id}`);
          const data = await res.json();
          console.log(data);
  
          if (data.status === "success") {
            const gallery = data.data;
  
            document.getElementById("hidden_id").value = gallery.id;
            document.getElementById("title").value = gallery.title;
            document.getElementById("image_url").value = gallery.image_url;
            document.getElementById("description").value = gallery.description;
            document.getElementById("category_id").value = gallery.category_id;
  
            const modal = new bootstrap.Modal(document.getElementById("galleryFormModal"));
            modal.show();
          } else {
            swal("Gagal", "Gallery tidak ditemukan", "error");
          }
        } catch (err) {
          swal("Error", "Gagal menghubungi server", "error");
        }
      });
    });

    // RESET SAAT MENUTUP MODAL
    document.getElementById('galleryFormModal').addEventListener('hidden.bs.modal', function () {
        document.getElementById("galleryForm").reset();
        document.getElementById("hidden_id").value = '';
    });
      
  
    // DELETE
    document.querySelectorAll(".galleryDelete").forEach((btn) => {
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
            const res = await fetch(`/api/galleries/gallery/${id}`, {
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