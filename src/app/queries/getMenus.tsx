import { gql } from "@apollo/client";
import MenuFragment from '../queries/fragments/menus';

export const GET_MENUS = gql `
    headerMenus: menuItems(where: {location: HEADER_MENU, parentId: "0"}) {
      edges {
        node {
         ...MenuFragment
          childItems {
            edges {
              node {
                ...MenuFragment
              }
            }
          }
        }
      }
    }
    footerMenus: menuItems(where: {location: FOOTER_MENU, parentId: "0"}) {
      edges {
        node {
          ...MenuFragment
        }
      }
    }
  }
    ${MenuFragment}
    `