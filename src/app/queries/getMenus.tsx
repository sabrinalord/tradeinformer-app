
export const GET_HEADER_MENU = `query GetHeaderMenu {
    menuItems(where: {location: HEADER_MENU, parentId: "0"}) {
      edges {
        node {
           id
            label
            url
            path
          childItems {
            edges {
              node {
                id
                label
                url
                path
              }
            }
          }
        }
      }
    }
}
    `


    export const GET_FOOTER_MENU = `
    query GetFooterMenu {
    menuItems(where: {location: FOOTER_MENU, parentId: "0"}) {
    edges {
      node {
        id
        label
        url
        path
        childItems {
          edges {
            node {
              id
              label
              url
              path
            }
          }
        }
      }
    }
  }
}
    `