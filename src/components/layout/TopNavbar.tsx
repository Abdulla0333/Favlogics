import { useEffect, useRef, useState } from 'react'
import { APP_BRANDING } from '@/constants'
import { NavbarIcon } from '@/components/ui'

const NAV_ITEMS = [
  { id: "inbox", label: "Inbox", icon: "inbox" as const },
  { id: "contacts", label: "Contacts", icon: "contacts" as const },
  { id: "ai", label: "AI Employees", icon: "ai" as const },
  { id: "workflows", label: "Workflows", icon: "workflow" as const },
  { id: "campaigns", label: "Campaigns", icon: "campaign" as const },
] as const;

type NavItemId = (typeof NAV_ITEMS)[number]["id"];

export function TopNavbar() {
  const [activeNav, setActiveNav] = useState<NavItemId>("inbox");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!settingsOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!settingsRef.current?.contains(event.target as Node)) {
        setSettingsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [settingsOpen]);

  return (
    <header className="top-navbar dashboard-top-navbar">
      <div className="top-navbar-left">
        <span className="top-navbar-logo">{APP_BRANDING.productName}</span>

        <nav className="top-navbar-nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveNav(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={`top-navbar-nav-item ${isActive ? "top-navbar-nav-item--active" : ""}`}
              >
                <NavbarIcon
                  name={item.icon}
                  className="navbar-icon navbar-icon--nav"
                />
                <span
                  className={`top-navbar-nav-label ${
                    item.id === "ai" ||
                    item.id === "workflows" ||
                    item.id === "campaigns"
                      ? "top-navbar-nav-label--hide-tablet"
                      : ""
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="top-navbar-right">
        <div className="top-navbar-settings-wrap" ref={settingsRef}>
          <button
            type="button"
            aria-label="Settings"
            aria-expanded={settingsOpen}
            onClick={() => setSettingsOpen((open) => !open)}
            className={`top-navbar-icon-button ${settingsOpen ? "top-navbar-icon-button--active" : ""}`}
          >
            <NavbarIcon
              name="settings"
              className="navbar-icon navbar-icon--settings"
            />
          </button>

          {settingsOpen && (
            <div className="top-navbar-settings-menu" role="menu">
              <button
                type="button"
                role="menuitem"
                className="top-navbar-settings-item"
              >
                Account settings
              </button>
              <button
                type="button"
                role="menuitem"
                className="top-navbar-settings-item"
              >
                Notifications
              </button>
              <button
                type="button"
                role="menuitem"
                className="top-navbar-settings-item"
                onClick={() => setSettingsOpen(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          className="top-navbar-profile"
          aria-label="Open profile menu"
        >
          <span className="top-navbar-avatar" aria-hidden>
            M
          </span>
          <span className="top-navbar-profile-name">{APP_BRANDING.activeUserDisplayName}</span>
        </button>
      </div>
    </header>
  );
}
