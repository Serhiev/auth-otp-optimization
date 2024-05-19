const socialInfo = [
    {
        icon: <svg className="w-6 h-6 hover:text-gray-500 duration-150" fill="none" viewBox="0 0 28 28"><g clipPath="url(#clip0_1213_3074)"><path fill="currentColor" d="M25.927 0H2.067C.924 0 0 .902 0 2.018v23.959C0 27.092.924 28 2.067 28h23.86C27.07 28 28 27.092 28 25.982V2.018C28 .902 27.07 0 25.927 0zM8.307 23.86H4.151V10.495h4.156V23.86zM6.229 8.673a2.407 2.407 0 110-4.812 2.406 2.406 0 010 4.812zM23.86 23.86h-4.15v-6.497c0-1.547-.028-3.543-2.16-3.543-2.16 0-2.49 1.69-2.49 3.434v6.606h-4.144V10.495h3.98v1.826h.056c.552-1.05 1.908-2.16 3.926-2.16 4.206 0 4.982 2.767 4.982 6.366v7.333z" /></g><defs><clipPath id="clip0_1213_3074"><path fill="#fff" d="M0 0h28v28H0z" /></clipPath></defs></svg>,
        href: "https://www.linkedin.com/in/serhii-vem/"
    },
    {
        icon: <svg className="w-6 h-6 hover:text-gray-500 duration-150" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0C5.373 0 0 5.373 0 12c0 5.301 3.438 9.801 8.206 11.385.6.11.793-.257.793-.577 0-.285-.01-1.042-.015-2.045-3.338.723-4.042-1.6-4.042-1.6-.546-1.384-1.332-1.753-1.332-1.753-1.088-.743.083-.727.083-.727 1.204.085 1.838 1.237 1.838 1.237 1.07 1.83 2.81 1.303 3.497.995.108-.777.419-1.303.76-1.603-2.665-.301-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.225-.125-.3-.54-1.524.118-3.176 0 0 1.008-.322 3.3 1.23a11.576 11.576 0 013.012-.405c1.024.005 2.055.138 3.012.405 2.29-1.552 3.297-1.23 3.297-1.23.662 1.652.243 2.876.118 3.176.772.845 1.233 1.915 1.233 3.225 0 4.608-2.807 5.624-5.479 5.92.43.373.81 1.104.81 2.224 0 1.608-.015 2.903-.015 3.298 0 .32.188.695.8.576C20.566 21.797 24 17.297 24 12c0-6.627-5.373-12-12-12z" /></svg>,
        href: "https://github.com/Serhiev"
    }
]

const Footer = () => (
    <footer className="bottom-0 w-full">
        <div className="custom-screen pt-16">
            <div className="mt-10 py-10 border-t items-center justify-between sm:flex">
                <p className="text-gray-600">© 2024 Auth Portal by Serhii Vem.</p>
                <div className="flex items-center gap-x-6 text-gray-400 mt-6">
                    {
                        socialInfo.map((item, idx) => (
                            <a key={idx} href={item.href} aria-label="social media" target="_blank" rel="noreferrer">
                                {item.icon}
                            </a>
                        ))
                    }
                </div>
            </div>
        </div>
    </footer>
)

export default Footer