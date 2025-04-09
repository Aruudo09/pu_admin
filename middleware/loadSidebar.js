const { Userlevel, Menu, Submenu, Aksesmenu, Aksessubmenu } = require('../models');

const loadSidebar = async (req, res, next) => {
  try {
    const idlevel = 1; // Ganti sesuai session/token pengguna nantinya

    // Ambil semua menu yang sesuai dengan hak akses user
    const aksesMenus = await Aksesmenu.findAll({
      where: {
        id_level: idlevel,
        view_level: 'Y',
      },
      include: [
        {
          model: Menu,
          where: { is_active: 'Y' },
          required: true,
          order: [['urutan', 'ASC']],
        },
      ],
    });

    // Format ulang agar lebih mudah di-loop
    const menus = await Promise.all(aksesMenus.map(async (akses) => {
      const menu = akses.Menu;

      // Ambil semua submenu untuk menu ini
      const aksesSubmenus = await Aksessubmenu.findAll({
        where: {
          id_level: idlevel,
        },
        include: [
          {
            model: Submenu,
            where: {
              id_menu: menu.id_menu,
              is_active: 'Y',
            },
            required: true,
            order: [['urutan', 'ASC']],
          },
        ],
      });

      const submenus = aksesSubmenus.map((aksesSub) => aksesSub.Submenu);

      return {
        id_menu: menu.id_menu,
        nama_menu: menu.nama_menu,
        icon: menu.icon,
        link: menu.link,
        submenus,
      };
    }));

    res.locals.sidebarMenus = menus;
    next();
  } catch (error) {
    console.error('❌ Error loading sidebar:', error);
    next(error);
  }
};

module.exports = loadSidebar;
