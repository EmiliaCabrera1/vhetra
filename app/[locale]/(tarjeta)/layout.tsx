export default function TarjetaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-screen bg-[#F7F7F7]">{children}</div>;
}
