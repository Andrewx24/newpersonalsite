"use client"

import * as React from "react"
import type { ToastActionElement, ToastProps } from "@/components/ui/toast"

// Configuration constants
const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

// Define the structure of our toast notifications
type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

// Using const enum for better type safety and runtime efficiency
const enum ActionType {
  ADD_TOAST = "ADD_TOAST",
  UPDATE_TOAST = "UPDATE_TOAST",
  DISMISS_TOAST = "DISMISS_TOAST",
  REMOVE_TOAST = "REMOVE_TOAST",
}

// Define all possible actions for our reducer using discriminated union types
type Action =
  | {
      type: ActionType.ADD_TOAST
      toast: ToasterToast
    }
  | {
      type: ActionType.UPDATE_TOAST
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType.DISMISS_TOAST
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType.REMOVE_TOAST
      toastId?: ToasterToast["id"]
    }

// Define the shape of our state
interface State {
  toasts: ToasterToast[]
}

// Map to track timeout IDs for toast removal
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

// Counter for generating unique IDs
let count = 0

// Generate unique IDs for toasts
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

// Add toast to removal queue after specified delay
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: ActionType.REMOVE_TOAST,
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

// Reducer function to handle all state updates
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case ActionType.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case ActionType.DISMISS_TOAST: {
      const { toastId } = action

      // Handle toast dismissal and queue removal
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }

    case ActionType.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

// Array to keep track of state update listeners
const listeners: Array<(state: State) => void> = []

// Initialize memory state
let memoryState: State = { toasts: [] }

// Dispatch function to handle state updates
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

// Type for creating new toasts (omitting the id as it's generated)
type Toast = Omit<ToasterToast, "id">

// Main toast function to create and manage toast notifications
function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: ActionType.UPDATE_TOAST,
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: ActionType.DISMISS_TOAST, toastId: id })

  dispatch({
    type: ActionType.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

// Custom hook for consuming toast functionality in components
function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: ActionType.DISMISS_TOAST, toastId }),
  }
}

export { useToast, toast }