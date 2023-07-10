<script lang="ts">
  import Counter from './lib/Counter.svelte'
  import Users from './lib/Users.svelte';
  import { Client, setContextClient, cacheExchange, fetchExchange } from '@urql/svelte';

  const client = new Client({
    url: 'http://localhost:4000/graphql',
    exchanges: [cacheExchange, fetchExchange],
  });

  setContextClient(client);
// const users = [
//   {
//                     "id": 1,
//                     "username": "User1",
//                     "companies": [
//                         {
//                             "id": 10,
//                             "name": "Company 10"
//                         },
//                         {
//                             "id": 18,
//                             "name": "Company 18"
//                         },
//                         {
//                             "id": 32,
//                             "name": "Company 32"
//                         },
//                         {
//                             "id": 34,
//                             "name": "Company 34"
//                         },
//                         {
//                             "id": 69,
//                             "name": "Company 69"
//                         }
//                     ]
//                 },
//                 {
//                     "id": 2,
//                     "username": "User2",
//                     "companies": [
//                         {
//                             "id": 3,
//                             "name": "Company 3"
//                         },
//                         {
//                             "id": 45,
//                             "name": "Company 45"
//                         },
//                         {
//                             "id": 59,
//                             "name": "Company 59"
//                         },
//                         {
//                             "id": 71,
//                             "name": "Company 71"
//                         }
//                     ]
//                 },
//                 {
//                     "id": 3,
//                     "username": "User3",
//                     "companies": [
//                         {
//                             "id": 10,
//                             "name": "Company 10"
//                         },
//                         {
//                             "id": 53,
//                             "name": "Company 53"
//                         },
//                         {
//                             "id": 56,
//                             "name": "Company 56"
//                         },
//                         {
//                             "id": 84,
//                             "name": "Company 84"
//                         },
//                         {
//                             "id": 94,
//                             "name": "Company 94"
//                         }
//                     ]
//                 }
// ];

</script>

<main>

  <h1>Harvest Tech Challenge</h1>

  <div class="card">
    <Counter />
  </div>

  <Users  />

</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
