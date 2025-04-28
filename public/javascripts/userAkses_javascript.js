document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("userlevelTable").addEventListener("click", async (e) => {
        const detailBtn = e.target.closest(".userlevelDetail");
        if (detailBtn) {
          e.preventDefault();
          const id = detailBtn.getAttribute("data-id");
    
          try {
            const res = await fetch(`/api/userlevel/by-level/${id}`);
            const data = await res.json();
    
            if (!res.ok) throw new Error(data.message);
    
            const aksesMenu = data.data.aksesmenu;
            const aksesSubmenu = data.data.aksesSubmenu;

            // console.log("Akses Menu:", JSON.stringify(aksesMenu, null, 2));
            // console.log("Akses Submenu:", JSON.stringify(aksesSubmenu, null, 2)); 

            const tbody = document.querySelector("#userAksesT tbody");
            tbody.innerHTML = ""; // Kosongkan dulu
    
            aksesMenu.forEach((menu, i) => {
              const trMenu = document.createElement("tr");
              trMenu.className = "table-success";
              trMenu.innerHTML = `
                <td>${i + 1}</td>
                <td>${menu.nama_menu}</td>
                <td class="text-center">${menu.view_level === 'Y' ? iconCheck() : iconCross()}</td>
                <td colspan="5" class="bg-light"></td>
              `;
              tbody.appendChild(trMenu);
    
              aksesSubmenu
                .filter(sub => sub.id_menu === menu.id_menu)
                .forEach(sub => {
                  console.log("Submenu:", JSON.stringify(sub.Aksessubmenus[index], null, 2));
                  const trSub = document.createElement("tr");
                  trSub.className = "table-info";
                  trSub.innerHTML = `
                    <td></td>
                    <td>${sub.nama_submenu}</td>
                    <td class="text-center" data-level="view_level" data-id="${sub.id}" data-type="submenu">
                  ${sub.Aksessubmenus.view_level === 'Y' ? iconCheck('view_level', 'submenu', sub.id) : iconCross('view_level', 'submenu', sub.id)}
                </td>
                <td class="text-center" data-level="add_level" data-id="${sub.id}" data-type="submenu">
                  ${sub.Aksessubmenus.add_level === 'Y' ? iconCheck('add_level', 'submenu', sub.id) : iconCross('add_level', 'submenu', sub.id)}
                </td>
                <td class="text-center" data-level="edit_level" data-id="${sub.id}" data-type="submenu">
                  ${sub.Aksessubmenus.edit_level === 'Y' ? iconCheck('edit_level', 'submenu', sub.id) : iconCross('edit_level', 'submenu', sub.id)}
                </td>
                <td class="text-center" data-level="delete_level" data-id="${sub.id}" data-type="submenu">
                  ${sub.Aksessubmenus.delete_level === 'Y' ? iconCheck('delete_level', 'submenu', sub.id) : iconCross('delete_level', 'submenu', sub.id)}
                </td>
                <td class="text-center" data-level="print_level" data-id="${sub.id}" data-type="submenu">
                  ${sub.Aksessubmenus.print_level === 'Y' ? iconCheck('print_level', 'submenu', sub.id) : iconCross('print_level', 'submenu', sub.id)}
                </td>
                <td class="text-center" data-level="upload_level" data-id="${sub.id}" data-type="submenu">
                  ${sub.Aksessubmenus.upload_level === 'Y' ? iconCheck('upload_level', 'submenu', sub.id) : iconCross('upload_level', 'submenu', sub.id)}
                </td>
                  `;
                  tbody.appendChild(trSub);
                });
            });
    
            // tampilkan modal (jika kamu pakai modal)
            const modal = new bootstrap.Modal(document.getElementById("aksesModal"));
            modal.show();
    
          } catch (err) {
            console.error(err);
            alert("Gagal memuat data akses.");
          }
        }
    
        function iconCheck(level, type, id) {
            return `<i class="fas fa-check-circle text-success" data-level="${level}" data-id="${id}" data-type="${type}" style="cursor: pointer;"></i>`;
          }
    
        function iconCross(level, type, id) {
            return `<i class="fas fa-times-circle text-danger" data-level="${level}" data-id="${id}" data-type="${type}" style="cursor: pointer;"></i>`;
          }
      });

      document.querySelector("#userAksesT tbody").addEventListener("click", async (e) => {
        const icon = e.target.closest("i");
        if (icon) {
          const level = icon.getAttribute("data-level");
          const id = icon.getAttribute("data-id");
          const type = icon.getAttribute("data-type");
          const currentStatus = icon.classList.contains("text-success") ? 'Y' : 'N';
          const newStatus = currentStatus === 'Y' ? 'N' : 'Y'; // toggle status
    
          // Update status di UI
          icon.classList.toggle("text-success");
          icon.classList.toggle("fa-check-circle");
          icon.classList.toggle("text-danger");
          icon.classList.toggle("fa-times-circle");

          console.log("Icon clicked:", JSON.stringify({ level, id, type, newStatus }));

    
          // Kirim update status ke server (misalnya ke API)
          try {
            const res = await fetch(`/api/userlevel/update-access`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id,
                level,
                type,
                status: newStatus,
              }),
            });
    
            if (!res.ok) throw new Error("Gagal memperbarui status");
    
            console.log("Status berhasil diperbarui");
          } catch (err) {
            console.error("Error memperbarui status:", err);
            // Jika gagal, kembalikan ikon ke status sebelumnya
            icon.classList.toggle("text-success");
            icon.classList.toggle("text-danger");
          }
        }
      });
});