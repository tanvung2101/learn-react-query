import { useQuery,useMutation,useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";

const fetchSuperHeroes = () => {
  return request({url: '/superheroes'})
};

const addSuperHero = (hero) => {
  return request({url: '/superheroes', method: 'POST', data: hero})
}

export const useSuperHeroesData = (onSuccess,onError ) => {
    return useQuery(
        "super-heroes",
        fetchSuperHeroes,
        {
          // cacheTime: 5000,
          // staleTime: 30000,
          // refetchOnMount: true,
          // refetchOnWindowFocus: 'always'
          enabled: false,
          onSuccess,
          onError,
        //   select: (data) => {
        //     const superHeroNames = data.data.map((hero) => hero.name)
        //     return superHeroNames
        //   }
        }
      );
}

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient()
  return useMutation(addSuperHero, {
    onSuccess: data => {
      /** Query Invalidation Start */
      // queryClient.invalidateQueries('super-heroes')
      /** Query Invalidation End */

      /** Handling Mutation Response Start */
    queryClient.setQueryData('super-heroes', oldQueryData => {
      return {
        ...oldQueryData,
        data: [...oldQueryData.data, data.data]
      }
    })
      /** Handling Mutation Response Start */
    },
    /**Optimistic Update Start */
    // onMutate: async newHero => {
    //   await queryClient.cancelQueries('super-heroes')
    //   const previousHeroData = queryClient.getQueryData('super-heroes')
    //   queryClient.setQueryData('super-heroes', oldQueryData => {
    //     return {
    //       ...oldQueryData,
    //       data: [
    //         ...oldQueryData.data,
    //         { id: oldQueryData?.data?.length + 1, ...newHero }
    //       ]
    //     }
    //   })
    //   return { previousHeroData }
    // },
  })
}