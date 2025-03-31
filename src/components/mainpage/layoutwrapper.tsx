import LoadingBar from "../loadingbar/lodingbar";
import { CartProvider } from "@/context/cartcontext";
import Header from "../navbar/header";
import Footer from "../navbar/footer";
import { ToastProvider } from "@/context/toastcontext";
import { GoTop } from "../gotop";
import { AuthProvider } from "@/context/authcontext";
const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            {<Header />}
            <LoadingBar />

            {children}
            <GoTop />

            {<Footer />}
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  );
};

export default LayoutWrapper;
