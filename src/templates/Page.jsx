import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Layout from "components/Layout"
import { renderContentBlocks } from "components/ContentBlocks"
import PageContext from "context/PageContext"

const Page = ({ data: { page }, location: { state } }) => {
  return (
    <Layout>
      <PageContext.Provider value={state}>
        {renderContentBlocks(page.contentBlocks)}
      </PageContext.Provider>
    </Layout>
  )
}

export default Page

Page.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      contentBlocks: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.object,
  }).isRequired,
}

export const query = graphql`
  query HomepageQuery {
    page: sanityPage {
      contentBlocks {
        __typename
        ... on SanityHero {
          _key
          _type
          title
          description
          background {
            ...Image
          }
          presentation
        }
        ... on SanityRestaurantsViewer {
          _key
          _type
          title
          defaultFilters
          defaultSearchQuery
          defaultViewMode
        }
        ...ListCloud
      }
    }
  }
`
