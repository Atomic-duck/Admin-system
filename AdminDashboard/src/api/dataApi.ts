export const fetchAccounts = async () => {
   try {
      const url = 'http://localhost:3000/accounts'
      const respone = await fetch(url, {
         method: 'GET'
      })

      const result = await respone.json();
      if (!respone.ok) {
         throw new Error(result.message)
      }

      return result;
   } catch (err) {
      console.log(err)
      return [];
   }
}

export const createAccount = async (username: string, role: string, password: string) => {
   try {
      const url = 'http://localhost:3000/auth/register'
      const respone = await fetch(url, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            username,
            role,
            password
         })
      })

      const result = await respone.json();
      if (!respone.ok) {
         throw new Error(result.message)
      }
   } catch (err) {
      console.log(err)
      throw err;
   }
}

export const deleteAccount = async (id: string) => {
   try {
      const url = `http://localhost:3000/accounts/${id}`
      const respone = await fetch(url, {
         method: 'DELETE'
      })

      const result = await respone.json();
      if (!respone.ok) {
         throw new Error(result.message)
      }

      return true;
   } catch (err) {
      console.log(err)
      return false;
   }
}

export const fetchUsers = async () => {
   try {
      const url = 'http://localhost:3000/users'
      const respone = await fetch(url, {
         method: 'GET'
      })

      const result = await respone.json();
      if (!respone.ok) {
         throw new Error(result.message)
      }

      return result;
   } catch (err) {
      console.log(err)
      return [];
   }
}

export const fetchUsersCount = async () => {
   try {
      const url = 'http://localhost:3000/users-count'
      const respone = await fetch(url, {
         method: 'GET'
      })

      const result = await respone.json();
      if (!respone.ok) {
         throw new Error(result.message)
      }

      return result.count;
   } catch (err) {
      console.log(err)
      return -1;
   }
}

export const fetchReports = async () => {
   try {
      const url = 'http://localhost:3000/road-status'
      const respone = await fetch(url, {
         method: 'GET'
      })

      const result = await respone.json();
      if (!respone.ok) {
         throw new Error(result.message)
      }

      return result;
   } catch (err) {
      console.log(err)
      return [];
   }
}

export const deleteSub = async (id: string) => {
   try {
      const url = `http://localhost:3000/subscriptions/${id}`
      const respone = await fetch(url, {
         method: 'DELETE'
      })

      const result = await respone.json();
      if (!respone.ok) {
         throw new Error(result.message)
      }

      return true;
   } catch (err) {
      console.log(err)
      return false;
   }
}

export const fetchReportsCount = async (days?: number) => {
   try {
      const url = `http://localhost:3000/road-status/count${days ? `?preDay=${days}` : ''}`;
      const respone = await fetch(url, {
         method: 'GET',
      })

      const result = await respone.json();
      if (!respone.ok) {
         throw new Error(result.message)
      }

      console.log(result)

      return result;
   } catch (err) {
      console.log(err)
      return -1;
   }
}

export const deleteReport = async (id: string) => {
   try {
      const url = `http://localhost:3000/road-status/${id}`
      const respone = await fetch(url, {
         method: 'DELETE'
      })

      const result = await respone.json();
      if (!respone.ok) {
         throw new Error(result.message)
      }

      return true;
   } catch (err) {
      console.log(err)
      return false;
   }
}

export const deleteUser = async (email: string) => {
   try {

   } catch (err) {

   }
}

export const fetchUserDetail = async (email: string) => {
   try {
      const url = `http://localhost:3000/users/${email}`;
      const respone = await fetch(url, {
         method: 'GET',
      })

      const result = await respone.json();
      if (!respone.ok) {
         throw new Error(result.message)
      }

      console.log(result)

      return result;
   } catch (err) {
      console.log(err)
      return -1;
   }
}