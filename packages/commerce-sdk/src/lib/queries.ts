export const GET_ORDER_BY_ID_QUERY = `#graphql
  query getOrderById($id: ID!) {
    order(id: $id) {
      id
      tags
      lineItems(first: 10) {
        edges {
          node {
            id
            quantity
            variant {
              id
              product {
                id
                title
                description
                featuredImage {
                  id
                  url
                }
              }
            }
            customAttributes {
              key
              value
            }
          }
        }
      }
    }
  }
`;

export const GENERATE_BASIC_DISCOUNT_MUTATION = `#graphql
  mutation discountAutomaticBasicCreate($automaticBasicDiscount: DiscountAutomaticBasicInput!) {
    discountAutomaticBasicCreate(automaticBasicDiscount: $automaticBasicDiscount) {
      automaticDiscountNode {
        id
        automaticDiscount {
          ... on DiscountAutomaticBasic {
            startsAt
            endsAt
            customerGets {
              value {
                ... on DiscountAmount {
                  amount {
                    amount
                    currencyCode
                  }
                  appliesOnEachItem
                }
              }
              items {
                ... on AllDiscountItems {
                  allItems
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        code
        message
      }
    }
  }
`;