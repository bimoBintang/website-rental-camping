import HeaderAdmin from "./_components/header";
import NavigationBottom from "./_components/navigationBottom";
import SessionProviders from "@/components/SessionProvider";




export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <SessionProviders>
            <main>
                <HeaderAdmin />
                    {children}
                <NavigationBottom />
            </main>
        </SessionProviders>
    )
}