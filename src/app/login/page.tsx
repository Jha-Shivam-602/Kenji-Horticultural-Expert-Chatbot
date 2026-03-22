'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: 'var(--bg-color)',
      padding: '2rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: 'var(--panel-bg)',
        boxShadow: 'var(--shadow-float)',
        borderRadius: 'var(--radius-md)',
        padding: '2rem',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{ 
          width: '48px', height: '48px', 
          borderRadius: 'var(--radius-sm)', 
          overflow: 'hidden', 
          border: '1px solid var(--border-color)',
          marginBottom: '1.5rem'
        }}>
          <Image src="/logo.png" alt="Logo" width={48} height={48} />
        </div>
        
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)' }}>Welcome back</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Log in to your account</p>

        <form style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={e => {
          e.preventDefault();
          router.push('/dashboard');
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-main)' }}>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              style={{ padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.9rem', width: '100%', backgroundColor: 'transparent' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-main)' }}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              style={{ padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.9rem', width: '100%', backgroundColor: 'transparent' }}
            />
          </div>
          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              marginTop: '0.5rem',
              backgroundColor: 'var(--accent)',
              color: 'var(--bg-color)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'var(--transition-smooth)'
            }}
          >
            Continue
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Don't have an account? <Link href="/signup" style={{ color: 'var(--text-main)', fontWeight: 500, textDecoration: 'underline' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
