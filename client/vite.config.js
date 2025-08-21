import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
plugins: [react()],
server: {
port: 5173,
proxy: {
'/auth': 'http://localhost:3000',
'/employees': 'http://localhost:3000',
'/departments': 'http://localhost:3000',
'/shifts': 'http://localhost:3000',
'/users': 'http://localhost:3000'
}
}
})