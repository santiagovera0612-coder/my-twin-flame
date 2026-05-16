// Stub Supabase client — backend disabled (visual-only mode).
// All methods return empty/no-op results so the UI renders without errors.

type Result<T = unknown> = { data: T; error: null };

function makeQuery(): any {
  const result: Result<any[]> = { data: [], error: null };
  const single: Result<null> = { data: null, error: null };
  const builder: any = {
    select: () => builder,
    insert: () => Promise.resolve(single),
    update: () => builder,
    delete: () => builder,
    upsert: () => Promise.resolve(single),
    eq: () => builder,
    neq: () => builder,
    in: () => builder,
    gt: () => builder,
    gte: () => builder,
    lt: () => builder,
    lte: () => builder,
    like: () => builder,
    ilike: () => builder,
    order: () => builder,
    limit: () => builder,
    range: () => builder,
    maybeSingle: () => Promise.resolve(single),
    single: () => Promise.resolve(single),
    then: (resolve: (v: Result<any[]>) => void) => Promise.resolve(result).then(resolve),
  };
  return builder;
}

// Fake user/session for visual-only mode — lets protected routes render.
const fakeUser = { id: "demo-user", email: "demo@clerivo.app" };
const fakeSession = { user: fakeUser, access_token: "demo", refresh_token: "demo" };

const auth = {
  getSession: async () => ({ data: { session: fakeSession }, error: null }),
  getUser: async () => ({ data: { user: fakeUser }, error: null }),
  onAuthStateChange: (_cb?: unknown) => ({
    data: { subscription: { unsubscribe() {} } },
  }),
  signInWithPassword: async (_args: unknown) => ({ data: { user: fakeUser, session: fakeSession }, error: null }),
  signUp: async (_args: unknown) => ({ data: { user: fakeUser, session: fakeSession }, error: null }),
  signOut: async () => ({ error: null }),
  updateUser: async (_args: unknown) => ({ data: { user: null }, error: null }),
  resetPasswordForEmail: async (_email: string) => ({ data: {}, error: null }),
};

const storage = {
  from: (_bucket: string) => ({
    upload: async () => ({ data: null, error: null }),
    download: async () => ({ data: null, error: null }),
    remove: async () => ({ data: null, error: null }),
    getPublicUrl: (_path: string) => ({ data: { publicUrl: "" } }),
  }),
};

export const supabase: any = {
  auth,
  storage,
  from: (_table: string) => makeQuery(),
  rpc: async (_fn: string, _params?: unknown) => ({ data: null, error: null }),
  functions: {
    invoke: async (_name: string, _opts?: unknown) => ({ data: null, error: null }),
  },
  channel: (_name: string) => ({
    on: () => ({ subscribe: () => ({ unsubscribe() {} }) }),
    subscribe: () => ({ unsubscribe() {} }),
  }),
  removeChannel: () => {},
};
