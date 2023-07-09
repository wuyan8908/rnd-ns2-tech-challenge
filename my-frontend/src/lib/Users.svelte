<script lang="ts">
  export let users = [];

</script>

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Username</th>
      <th>Companies</th>
    </tr>
  </thead>
  <tbody>
    {#each users as user}
      <tr>
        <td>{user.id}</td>
        <td>{user.username}</td>
        <td>{user.companies.map(c => c.name ).join(", ")}</td>
      </tr>
    {/each}
  </tbody>
</table>
