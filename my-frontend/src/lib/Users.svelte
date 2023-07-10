<script lang="ts">
  import { CREATE_USER } from "../graphql/mutation";
  import { GET_USERS } from "../graphql/queries";
  import { queryStore, getContextClient, mutationStore } from "@urql/svelte";

  let page = 1;
  let pageSize = 5;
  let username = "";
  let newUsername = "";
  let result;
  // fix:"Function called outside component initialization" error. getContextClient() cannot run conditionally.
  const client = getContextClient();
  $: users = queryStore({
    client,
    query: GET_USERS,
    variables: { page, pageSize, username },
  });

  const createUser = () => {
    if (newUsername) {
      result = mutationStore({
        client,
        query: CREATE_USER,
        variables: { username: newUsername },
      });
    } else {
      alert("username cannot be null");
    }
  };
  const handleNextPage = () => {
    page++;
  };

  const handlePreviousPage = () => {
    page = Math.max(1, page - 1);
  };

  const handleChangePageSize = (event) => {
    // reset page when Change pageSize.
    page = 1;
    pageSize = +event.target.value;
  };

  const handleSearch = (event) => {
    page = 1;
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
          <input on:change={handleSearch} placeholder="Search by Username" />
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
            <option value="1000" selected={pageSize === 1000}> 1000 </option>
          </select>
        </td>
      </tr>
    </tbody>
  </table>
{/if}
<!-- Create New User Feature -->
<h3>Create New User</h3>
<input bind:value={newUsername} placeholder="Name" />
<button on:click={createUser}>Create User</button>
{#if !$result}
  <p />
{:else if $result.fetching}
  <p>Loading...</p>
{:else if $result.error}
  <p>Error... {$result.error.message}</p>
{:else}
  <h5>New User</h5>
  <p>User Id: {$result.data.createUser.id}</p>
  <p>User Name: {$result.data.createUser.username}</p>
{/if}
