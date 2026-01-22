import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/account",
  },
  callbacks: {
    authorized: ({ token }) => {
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/cart", "/wishlist"],
};
