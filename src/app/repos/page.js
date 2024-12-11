'use client';

import RepoTable from './RepoTable';
import {
  Link,
  Column,
  Grid,
  DataTableSkeleton,
  Pagination,
} from '@carbon/react';
import React, { useEffect, useState } from 'react';
import { Octokit } from '@octokit/core';

const headers = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'createdAt',
    header: 'Created',
  },
  {
    key: 'updatedAt',
    header: 'Updated',
  },
  {
    key: 'issueCount',
    header: 'Open Issues',
  },
  {
    key: 'stars',
    header: 'Stars',
  },
  {
    key: 'links',
    header: 'Links',
  },
];

// declare client
const octokitClient = new Octokit({});
// create a function to fetch repos

function RepoPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rows, setRows] = useState([]);

  // pagination of 10 render at a time
  const [firstRowIndex, setFirstRowIndex] = useState(0); // first row set 0
  const [currentPageSize, setCurrentPageSize] = useState(10); // 10 first page

  // use effect is used when we fetch data from an API

  useEffect(() => {
    async function getCarbonRepos() {
      const res = await octokitClient.request('GET /orgs/{org}/repos', {
        org: 'carbon-design-system',
        per_page: 100,
        sort: 'updated',
        direction: 'desc',
      });

      if (res.status === 200) {
        setRows(getRowItems(res.data));
      } else {
        setError('Failed to fetch data');
      }
      setLoading(false);
    }
    getCarbonRepos();
    // render once when the page reload.
  }, []);

  // helper for last column in the data table for link used in getRowItems
  const LinkList = ({ url, homepageUrl }) => (
    <ul style={{ display: 'flex' }}>
      <li>
        <Link href={url}> Github </Link>
      </li>
      {homepageUrl && (
        <li>
          <span>&nbsp;|&nbsp;</span>
          <Link href={homepageUrl}>Homepage</Link>
        </li>
      )}
    </ul>
  );

  // helper to get row items from the data
  // fetch all the data and map them into state of ROWS. in state.
  const getRowItems = (rows) =>
    rows.map((row) => ({
      ...row, // copy over all the data
      key: row.id,
      stars: row.stargazers_count,
      issueCount: row.open_issues_count,
      createdAt: new Date(row.created_at).toLocaleDateString(),
      updatedAt: new Date(row.updated_at).toLocaleDateString(),
      links: <LinkList url={row.html_url} homepageUrl={row.homepage} />,
    }));

  // page loading
  // if (loading) {
  //   return "Loading...";
  // }
  // if (error) {
  //   return `Error: ${error}`;
  // }

  // skeleton page table loading
  if (loading) {
    return (
      <Grid className="repo-page">
        <Column lg={16} md={8} sm={4} className="repo-page__r1">
          <DataTableSkeleton
            columnCount={headers.length + 1}
            rowCount={10}
            headers={headers}
          />
        </Column>
      </Grid>
    );
  }
  // what is being returned to the web
  return (
    <Grid className="repo-page">
      <Column lg={16} md={8} sm={4} className="repo-page__r1">
        <RepoTable
          headers={headers}
          rows={rows.slice(firstRowIndex, firstRowIndex + currentPageSize)}
        />
        {/* Setting 10 link to each page and render to next page */}
        <Pagination
          totalItems={rows.length}
          backwardText="Previous page"
          forwardText="Next page"
          pageSize={currentPageSize}
          pageSizes={[5, 10, 15, 25]}
          itemsPerPageText="Items per page"
          onChange={({ page, pageSize }) => {
            if (pageSize !== currentPageSize) {
              setCurrentPageSize(pageSize);
            }
            setFirstRowIndex(pageSize * (page - 1));
          }}
        />
      </Column>
    </Grid>
  );
}

export default RepoPage;
