<script lang="ts">
  import { GET_USERS } from "../graphql/queries";
  import { queryStore, gql, getContextClient } from "@urql/svelte";

  let page = 1;
  let pageSize = 5;
  let username = "";
  $: users = queryStore({
    client: getContextClient(),
    query: GET_USERS,
    variables: { page, pageSize, username },
  });

  const handleNextPage = () => {
    page++;
  };

  const handlePreviousPage = () => {
    page = Math.max(1, page - 1);
  };

  const handleChangePageSize = (event) => {
    pageSize = +event.target.value;
  };

  const handleSearch = (event) => {
    username = event.target.value;
  };
</script>

{#if $users.fetching}
  <p>Loading...</p>
{:else if $users.error}
  <p>Error... {$users.error.message}</p>
{:else}
  <table>
    <thead>
      <tr>
        <th colspan="3" align="right">
          <input on:change={handleSearch} placeholder="Search" />
        </th>
      </tr>
      <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Companies</th>
      </tr>
    </thead>
    <tbody>
      {#each $users.data.Users.data as user}
        <tr>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.companies.map((c) => c.name).join(", ")}</td>
        </tr>
      {/each}
      <!-- Handle Pagination -->
      <tr>
        <td> <button on:click={handlePreviousPage}>Back</button></td>
        <td> <button on:click={handleNextPage}>Next</button></td>
        <td>
          <select on:change={handleChangePageSize}>
            <option value="5" selected={pageSize === 5}> 5 </option>
            <option value="10" selected={pageSize === 10}> 10 </option>
            <option value="20" selected={pageSize === 20}> 20 </option>
            <option value="100" selected={pageSize === 100}> 100 </option>
          </select>
        </td>
      </tr>
    </tbody>
  </table>
{/if}
