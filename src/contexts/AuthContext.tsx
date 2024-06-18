import { z } from "zod";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import { APIパス } from "../lib/config";

// ユーザー情報のスキーマ定義（仮）
const UserSchema = z.object({
  email: z.string(),
});

// ユーザー情報の型定義
type User = z.infer<typeof UserSchema>;

// ログイン状態のスキーマ定義
const AuthStateSchema = z.object({
  isLoggedIn: z.boolean(),
  user: UserSchema.nullable(),
  login: z
    .function()
    .args(z.string(), z.string(), z.boolean())
    .returns(z.promise(z.unknown())),
  logout: z.function().args(z.boolean()).returns(z.promise(z.unknown())),
  token: z.string(),
});

// ログイン状態の型定義
type AuthState = z.infer<typeof AuthStateSchema>;

interface AuthProviderProps {
  children: ReactNode;
}

// ローカルストレージのキー
const LOCAL_STORAGE_KEY = "auth";

// ローカルストレージからログイン情報を読み込む関数
const loadAuthStateFromLocalStorage = () => {
  const authStateJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (authStateJSON) {
    return JSON.parse(authStateJSON);
  }
  return null;
};

// デフォルト値を含む AuthContext の作成
const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  user: null,
  login: async () => {},
  logout: async () => {},
  token: "",
});

// ログインプロバイダーのコンポーネント
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null); // ユーザー情報の状態を管理する
  const [token, setToken] = useState<string>(""); // トークンの状態を管理する
  const router = useRouter();

  useEffect(() => {
    // ページ読み込み時にローカルストレージからログイン情報を読み込む
    const authState = loadAuthStateFromLocalStorage();
    if (authState && authState.isLoggedIn) {
      setIsLoggedIn(true);
      setUser(authState.user);
      setToken(authState.token);
    }
  }, []);

  // ログイン関数（引数でユーザーと管理者を判別）
  const login = async (email: string, password: string, admin: boolean) => {
    let response;
    try {
      switch (admin) {
        case true:
          // バックエンドの認証サービスと通信してログインを試みる
          response = await fetch(`${APIパス}/auth/admin/signin`, {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
          break;
        case false:
          // バックエンドの認証サービスと通信してログインを試みる
          response = await fetch(`${APIパス}/auth/signin`, {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
          break;
      }

      // レスポンスが正常でない場合はエラーをスローする
      if (!response.ok) {
        throw new Error("Failed to login");
      }

      // レスポンスデータを取得する
      const data = await response.json();
      const { token } = data;

      // トークンをセットする
      setToken(token);

      // ユーザー情報を取得するAPIにアクセスしてユーザー情報を取得する
      const userResponse = await fetch(`${APIパス}/my/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // トークンを使って認証
        },
      });

      // レスポンスが正常でない場合はエラーをスローする
      if (!userResponse.ok) {
        throw new Error("Failed to get user data");
      }

      // レスポンスデータからユーザー情報を取得する
      const userData = await userResponse.json();

      // ログイン成功時の処理
      setIsLoggedIn(true);
      setUser(userData); // ユーザー情報をセットする
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ isLoggedIn: true, user: userData, token })
      );

      // ログイン後のリダイレクト
      switch (admin) {
        case true:
          router.push("/admin/home");
          break;
        case false:
          router.push("/");
          break;
      }
    } catch (error) {
      // ログイン失敗時の処理
      console.error("Login error:", error);
      alert("メールアドレスかパスワードが違います。");
    }
  };

  // ログアウト関数
  const logout = async (admin: boolean) => {
    try {
      // バックエンドのログアウトエンドポイントにアクセスしてログアウトする
      const response = await fetch(`${APIパス}/auth/signout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // トークンを使って認証
        },
      });

      // レスポンスが正常でない場合はエラーをスローする
      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      // ログアウト成功時の処理
      setIsLoggedIn(false);
      setUser(null); // ユーザー情報を削除する
      setToken(""); // トークンを削除する
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      alert("ログアウトしました。");

      switch (admin) {
        case true:
          router.push("/login?isAdmin=true");
          break;
        case false:
          router.push("/login?isAdmin=false");
          break;
      }
    } catch (error) {
      // ログアウト失敗時の処理
      console.error("Logout error:", error);
      alert("ログアウトに失敗しました。");
    }
  };

  // AuthState を検証し、エラーがあればコンソールに出力する
  AuthStateSchema.parse({ isLoggedIn, user, login, logout, token });

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

// カスタムフックとしての useContext をエクスポート
export const useAuth = () => useContext(AuthContext);
