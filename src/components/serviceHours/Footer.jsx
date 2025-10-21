function Footer() {
    return (
        <footer className="flex justify-between items-center bg-white px-8 py-4 mt-8">
            <p className="text-sm text-gray-600">© 2024 FUNVAL. Todos los derechos reservados.</p>
            <div className="flex gap-4">
                <a href="#" className="text-sm text-blue-600 hover:underline">Términos de Servicio</a>
                <a href="#" className="text-sm text-blue-600 hover:underline">Política de Privacidad</a>
            </div>
        </footer>
    );
}

export default Footer;