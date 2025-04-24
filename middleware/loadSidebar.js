const { Menu, Submenu, Aksesmenu, Aksessubmenu } = require('../models');

const loadSidebar = async (req, res, next) => {
  try {
    const user = req.session.user;
    if (!user) {
      res.locals.sidebarMenus = [];
      return next();
    }

    const idlevel = user.id_level;

    // Ambil semua menu sesuai hak akses user
    const aksesMenus = await Aksesmenu.findAll({
      where: {
        id_level: idlevel,
        view_level: 'Y',  // Pastikan hanya mengambil menu dengan view_level = 'Y'
      },
      include: [
        {
          model: Menu,
          where: { is_active: 'Y' },
          required: true,
        },
      ],
      order: [[{ model: Menu }, 'urutan', 'ASC']],
    });

    const menus = await Promise.all(aksesMenus.map(async (akses) => {
      const menu = akses.Menu;

      // Ambil submenu yang sesuai dengan id_level dan id_menu
      const aksesSubmenus = await Aksessubmenu.findAll({
        where: {
          id_level: idlevel,
          view_level: 'Y',  // Pastikan hanya submenu dengan view_level = 'Y'
        },
        include: [
          {
            model: Submenu,
            where: {
              id_menu: menu.id_menu,
              is_active: 'Y',
            },
            required: true,
          },
        ],
        order: [[{ model: Submenu }, 'urutan', 'ASC']],
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
