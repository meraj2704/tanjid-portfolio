import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from "../api/api";

// Fetch Hook
export const useFetchData = <T = any>(
  key: string[],
  endPoint: string,
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">
) => {
  return useQuery<T>({
    queryKey: key,
    queryFn: () => apiGet(endPoint),
    ...options, // Spread additional options
  });
};

// Add Hook
export const useAddData = (key: string[], endPoint: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => apiPost(endPoint, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
};

// Update Hook
export const useUpdateData = (key: string[], endPoint: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => apiPut(endPoint, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
};
export const usePatchData = (key: string[], endPoint: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => apiPatch(endPoint, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
};

// Delete Hook
export const useDeleteData = (key: string[], endPoint: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiDelete(`${endPoint}/${id}`), // Assuming the ID is appended to the endpoint
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
};
