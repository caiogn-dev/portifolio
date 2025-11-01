'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode, useMemo } from 'react';
import { AppState, UserPreferences } from '@/lib/types';
import { useLocalStorage } from '@/lib/hooks';

// --- Estado inicial
const initialState: AppState = {
  theme: 'system',
  language: 'en',
  isLoading: false,
  error: undefined,
  user: undefined,
};

// --- Ações
type AppAction =
  | { type: 'SET_THEME'; payload: 'light' | 'dark' | 'system' }
  | { type: 'SET_LANGUAGE'; payload: 'en' | 'pt' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | undefined }
  | { type: 'SET_USER'; payload: AppState['user'] }
  | { type: 'UPDATE_USER_PREFERENCES'; payload: Partial<UserPreferences> }
  | { type: 'RESET_STATE' };

// --- Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
        user: state.user
          ? {
              ...state.user,
              preferences: {
                ...state.user.preferences,
                theme: action.payload,
              },
            }
          : undefined,
      };

    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload,
        user: state.user
          ? {
              ...state.user,
              preferences: {
                ...state.user.preferences,
                language: action.payload,
              },
            }
          : undefined,
      };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };

    case 'SET_USER':
      return { ...state, user: action.payload };

    case 'UPDATE_USER_PREFERENCES':
      return {
        ...state,
        user: state.user
          ? {
              ...state.user,
              preferences: {
                ...state.user.preferences,
                ...action.payload,
              },
            }
          : undefined,
      };

    case 'RESET_STATE':
      return initialState;

    default:
      return state;
  }
}

// --- Contexto
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: 'en' | 'pt') => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | undefined) => void;
  clearError: () => void;
  toggleTheme: () => void;
  toggleLanguage: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [storedPreferences, setStoredPreferences] =
    useLocalStorage<Partial<UserPreferences>>('user-preferences', {});

  // --- Carregar preferências apenas quando mudam e se forem diferentes do estado atual
  useEffect(() => {
    const nextTheme = storedPreferences?.theme;
    const nextLang = storedPreferences?.language;

    // Só despacha se tiver valor e for diferente do que já está no state
    if (nextTheme && nextTheme !== state.theme) {
      dispatch({ type: 'SET_THEME', payload: nextTheme });
    }
    if (nextLang && nextLang !== state.language) {
      dispatch({ type: 'SET_LANGUAGE', payload: nextLang });
    }
    // Dependências apenas dos campos usados para evitar re-disparar por referência de objeto
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedPreferences?.theme, storedPreferences?.language]);

  // --- Snapshot das preferências que queremos persistir
  const preferencesToPersist = useMemo<Partial<UserPreferences>>(
    () => ({
      theme: state.theme,
      language: state.language,
      animations: state.user?.preferences?.animations ?? true,
      notifications: state.user?.preferences?.notifications ?? true,
    }),
    [state.theme, state.language, state.user?.preferences?.animations, state.user?.preferences?.notifications]
  );

  // --- Salvar no localStorage apenas quando realmente mudou
  useEffect(() => {
    const current = JSON.stringify(storedPreferences ?? {});
    const next = JSON.stringify(preferencesToPersist);
    if (current !== next) {
      setStoredPreferences(preferencesToPersist);
    }
  }, [preferencesToPersist, setStoredPreferences, storedPreferences]);

  // --- Aplicar tema na <html>
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = window.document.documentElement;
    const isDark =
      state.theme === 'dark' ||
      (state.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    root.classList.remove('light', 'dark');
    root.classList.add(isDark ? 'dark' : 'light');
  }, [state.theme]);

  // --- Ouvir mudanças do tema do sistema (apenas quando theme==='system')
  useEffect(() => {
    if (typeof window === 'undefined' || state.theme !== 'system') return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(media.matches ? 'dark' : 'light');
    };

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [state.theme]);

  // --- Helpers
  const setTheme = (theme: 'light' | 'dark' | 'system') => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const setLanguage = (language: 'en' | 'pt') => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: string | undefined) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: undefined });
  };

  const toggleTheme = () => {
    const next = state.theme === 'light' ? 'dark' : state.theme === 'dark' ? 'system' : 'light';
    setTheme(next);
  };

  const toggleLanguage = () => {
    setLanguage(state.language === 'en' ? 'pt' : 'en');
  };

  const contextValue: AppContextType = {
    state,
    dispatch,
    setTheme,
    setLanguage,
    setLoading,
    setError,
    clearError,
    toggleTheme,
    toggleLanguage,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

// --- Hooks
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within an AppProvider');
  return ctx;
}

export function useTheme() {
  const { state, setTheme, toggleTheme } = useApp();
  return {
    theme: state.theme,
    setTheme,
    toggleTheme,
    isDark:
      state.theme === 'dark' ||
      (state.theme === 'system' &&
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches),
    isLight:
      state.theme === 'light' ||
      (state.theme === 'system' &&
        typeof window !== 'undefined' &&
        !window.matchMedia('(prefers-color-scheme: dark)').matches),
    isSystem: state.theme === 'system',
  };
}

export function useLanguage() {
  const { state, setLanguage, toggleLanguage } = useApp();
  return {
    language: state.language,
    setLanguage,
    toggleLanguage,
    isEnglish: state.language === 'en',
    isPortuguese: state.language === 'pt',
  };
}

export function useLoading() {
  const { state, setLoading } = useApp();
  return { isLoading: state.isLoading, setLoading };
}

export function useError() {
  const { state, setError, clearError } = useApp();
  return { error: state.error, hasError: !!state.error, setError, clearError };
}

export function useUser() {
  const { state, dispatch } = useApp();
  const setUser = (user: AppState['user']) => dispatch({ type: 'SET_USER', payload: user });
  const updatePreferences = (preferences: Partial<UserPreferences>) =>
    dispatch({ type: 'UPDATE_USER_PREFERENCES', payload: preferences });

  return {
    user: state.user,
    isAuthenticated: !!state.user,
    isAdmin: state.user?.role === 'admin',
    setUser,
    updatePreferences,
  };
}
