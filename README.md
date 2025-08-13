# react simplified package

 Lightweight component for React applications.

 ## Install

```js

npm install react-simplified-package

```

## Features/Useage

### Modal


<details>
<summary>Modal Useage</summary>

> Animated Entry/Exit: Smooth fade-in and slide-up/down animations for a better user experience.
> 
> Outside Click Dismiss: Automatically closes when clicking outside the modal content.
> 
> Escape Key Support: Closes the modal when the ESC key is pressed.
> 
> Customizable Content: Easily embed any React elements as children.
> 
> API: Intuitive isOpen and onClose props.

To use the Modal component, import it and control its visibility using a state variable in your parent component.

```js

import React, { useState } from 'react';
// Assuming Modal is exported from your package's main entry point
// Adjust the import path if your package structure is different
import { Modal } from 'react-simplified-package'; 

function App() {
  const [isMyModalOpen, setIsMyModalOpen] = useState(false);

  return (
    <div>
      <h1>My Application</h1>
      <button onClick={() => setIsMyModalOpen(true)}>Open My Modal</button>

      <Modal 
        isOpen={isMyModalOpen} 
        onClose={() => setIsMyModalOpen(false)}
      >
        <h2>Welcome to the Modal!</h2>
        <p>This is some content inside your beautifully animated modal.</p>
        <button onClick={() => setIsMyModalOpen(false)}>Close Modal</button>
      </Modal>
    </div>
  );
}

export default App;

```

### Custom Styles

Customizing Appearance with CSS Classes
The Modal component is designed to be easily styled. It provides three className props that allow you to apply custom CSS classes (e.g., from Tailwind CSS or your own stylesheet) to specific parts of the modal.

When you provide a className, it will replace the default inline styles for that element, giving you full control over its appearance.

> Available Props:
> 
> containerClassName: Applies to the main backdrop div that covers the entire screen.
> 
> modalClassName: Applies to the modal's content div. This is where you can customize its background, padding, shadow, etc.
> 
> buttonClassName: Applies to the close button. This is useful for changing its color, size, or position.

Example: Customizing Modal with Tailwind CSS

In this example, we'll create a custom modal with a different background color, a new shadow, and a styled close button by passing Tailwind CSS classes.

```JavaScript

import React, { useState } from 'react';
import { Modal } from 'react-simplified-package';

function CustomModalExample() {
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  return (
    <div>
      <h1>Application with Custom Modal</h1>
      <button onClick={() => setIsCustomModalOpen(true)}>Open Custom Modal</button>

      <Modal 
        isOpen={isCustomModalOpen} 
        onClose={() => setIsCustomModalOpen(false)}
        // ✅ Here, we're applying custom classes to each part of the modal.
        containerClassName="bg-blue-200/80" // Backdrop: semi-transparent blue
        modalClassName="bg-white rounded-2xl shadow-xl p-6 border-2 border-slate-400" // Modal content
        buttonClassName="absolute top-4 right-4 text-red-500 hover:text-red-700 font-bold text-2xl" // Close button
      >
        <h2>Custom Styled Modal</h2>
        <p>This modal has a blue backdrop, a yellow background, and a red close button, all styled with Tailwind CSS!</p>
      </Modal>
    </div>
  );
}

```

export default CustomModalExample;
Note: If a className prop is provided, the component will use your custom classes exclusively. If no className is provided, it will fall back to its default inline styles to maintain its base appearance.

### Multiple Modals

If you need to use multiple distinct modals, simply manage a separate isOpen state for each instance:

```js

import React, { useState } from 'react';
import { Modal } from 'react-simplified-package'; 

function DashboardPage() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  return (
    <div>
      <h3>Dashboard</h3>
      <button onClick={() => setIsProfileModalOpen(true)}>Edit Profile</button>
      <button onClick={() => setIsSettingsModalOpen(true)}>App Settings</button>

      {/* Profile Modal */}
      <Modal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)}
      >
        <h4>User Profile</h4>
        <p>Manage your personal details here.</p>
      </Modal>

      {/* Settings Modal */}
      <Modal 
        isOpen={isSettingsModalOpen} 
        onClose={() => setIsSettingsModalOpen(false)}
      >
        <h4>Application Settings</h4>
        <p>Configure your application preferences.</p>
      </Modal>
    </div>
  );
}

```
</details>



### Toast

<details>
<summary>Toast Useage</summary>
A non-blocking notification system for your React application.

### Features

Global State Management: Manages toasts from any component without prop drilling.

Animated Entry/Exit: Smoothly animates toasts as they appear and disappear.

Stacking and Scaling: Automatically stacks new toasts on top while scaling down older ones for a clean, layered look.

Customizable Content: Supports any React elements as toast content.

### Basic Usage

To use the toast system, you need to set up the ToastRender component at the root of your application, for example, in your App.tsx or _app.tsx. This component handles the rendering logic for all toasts.

First, ensure ToastRender is placed in a high-level component to enable toasts across your entire app.

```JavaScript

// App.tsx or Layout.tsx

import { ToastRender } from "./ToastRender";

function App() {
  return (
    <div>
      {/* Other application components */}
      <h1>My Application</h1>
      {/* ... */}
      <ToastRender />
    </div>
  );
}
```
Then, you can use the createToastInstance function to get a toast instance and show a toast from any component.

```JavaScript

// MyComponent.tsx

import React from "react";
import { createToast } from "./Toast";

// 1. Create a toast instance. You can create one instance and reuse it.
const toast = createToast("Hello, world!");

const MyComponent = () => {
  return (
    <button onClick={() => toast.run()}>
      Show Toast
    </button>
  );
};

export default MyComponent;
```

### Advanced Usage

You can customize the toast content and duration.

Customizing Content
You can pass a custom string or a full React element. The createToastInstance function also accepts a function that can take an optional string argument, making the toast content dynamic.

```JavaScript

import React from "react";
import { createToast } from "./Toast";

// With a simple string (most common)
const toastWithMessage = createToast("Action completed successfully!");

// With a full React component
const CustomContent = () => (
  <div style={{ padding: "10px", background: "lightgreen" }}>
    <strong>Success!</strong> Your data has been saved.
  </div>
);
const toastWithComponent = createToast(<CustomContent />);

// With a dynamic function
const toastWithDynamicContent = createToast((message: string) => (
  <p>{message}</p>
));

const AdvancedComponent = () => {
  return (
    <>
      <button onClick={() => toastWithMessage.run()}>
        Show Message Toast
      </button>
      <button onClick={() => toastWithComponent.run()}>
        Show Component Toast
      </button>
      <button onClick={() => toastWithDynamicContent.run("Data fetched!")}>
        Show Dynamic Toast
      </button>
    </>
  );
};
```

### Customizing Duration

You can specify a duration in milliseconds to control how long the toast remains on screen. You can set a default duration when creating the instance or override it at runtime. A duration of 0 will make the toast permanent until manually closed.

```JavaScript

import React from "react";
import { createToast } from "./Toast";

// Default duration of 5 seconds (5000ms)
const longToast = createToast("This toast lasts for 5 seconds.", {
  duration: 5000,
});

// Override the duration for a specific toast run
const shortToast = createToast("This is a short toast.");

const DurationComponent = () => {
  return (
    <>
      <button onClick={() => longToast.run()}>
        Show 5-Second Toast
      </button>
      <button
        onClick={() =>
          shortToast.run(undefined, { duration: 1500 })
        }
      >
        Show 1.5-Second Toast
      </button>
    </>
  );
};
```

</details>

### Dropdown

<details>
<summary>Dropdown Usage</summary>

`Dropdown` is a flexible and accessible dropdown component built using the Compound Component pattern. 
It handles the core logic and state management for you, allowing you to focus on building your UI.

### Key Features

Headless Logic: Automatically manages the dropdown's `isOpen` state and provides essential control functions like `toggle` and `close`.

Outside Click Dismiss: The dropdown automatically closes when a user clicks outside of it.

Accessibility Support: Handles important accessibility attributes like `aria-haspopup` and `aria-expanded` out of the box.

Full Customization: Offers full control over the styling using `className` and `style` props.

### Basic Usage

To use the dropdown, simply wrap your trigger and menu elements inside the main `Dropdown`.

```JavaScript

import React from 'react';
import { Dropdown } from 'react-simplified-package';

function MyDropdown() {
  return (
    <Dropdown>
      {/* 1. The Trigger component wraps the element that opens the dropdown */}
      <DropdownComponent.Trigger>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Options
        </button>
      </Dropdown.Trigger>

      {/* 2. The Menu component contains the content to be displayed */}
      <Dropdown.Menu>
        <div className="py-1">
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            My Account
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Settings
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Log out
          </a>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}
```
`Dropdown.Menu` Prop Details
The `Dropdown.Menu` provides two props for full control over its styling.

| Prop |	Type |	Description |
|---|----|---|
|`className`|	`string` |	Applies CSS classes to the menu container. If a `className` is provided, all default inline styles are ignored, giving you complete control over the component's appearance.|
|`style` |	`CSSProperties`|	Applies an inline style object to the menu container. This will only be applied if no `className` is provided, allowing you to override specific default styles while keeping others.|

Example: Customizing Styles

Using `className` for full control: Use this when you want to style the entire component with utility classes (e.g., from Tailwind CSS).

Using `style` for partial overrides: Use this when you want to maintain the default style but change only a few properties like `background` or `border`.

```JavaScript

// Using a className to define all styles
<Dropdown.Menu className="bg-white rounded-xl shadow-lg p-2 border-2 border-slate-300">
  {/* ... */}
</Dropdown.Menu>

// Using a style prop to override a specific property
<Dropdown.Menu style={{ backgroundColor: '#F0F4F8' }}>
  {/* ... */}
</Dropdown.Menu>
```
### Rendering Menu Items with Data
Because `Dropdown.Menu` accepts any JSX elements as children, you can easily use array methods like `.map()` to render dynamic menu items. 
This is ideal for menus populated from an API or based on user permissions.

Example: A data-driven dropdown menu

```JavaScript

import React from 'react';
import { Dropdown } from 'react-simplified-package';

const userActions = [
  { label: 'View Profile', handler: () => alert('Navigating to profile...') },
  { label: 'Change Settings', handler: () => alert('Navigating to settings...') },
  { label: 'Sign out', handler: () => alert('Signing out...') },
];

function UserDropdown() {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <button className="px-4 py-2 bg-purple-500 text-white rounded-md">
          User Menu
        </button>
      </Dropdown.Trigger>

      <Dropdown.Menu className="bg-white rounded-lg shadow-md p-2">
        {userActions.map((action, index) => (
          <button
            key={index}
            onClick={action.handler}
            className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md"
          >
            {action.label}
          </button>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
```
### Controlling State with a Hook
The `useDropdown` hook allows you to take full control of the dropdown's state from outside the component. 
This is useful for building more complex interactions or integrating with other UI elements.

```JavaScript

import { useDropdown, Dropdown } from 'react-simplified-package';

function AdvancedDropdown() {
  const { isOpen, toggle, open, close, dropdownRef } = useDropdown();

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <p>Dropdown state: {isOpen ? 'Open' : 'Closed'}</p>
      <button onClick={open} className="mr-2 p-2 bg-green-500 text-white rounded">
        Force Open
      </button>
      <button onClick={close} className="p-2 bg-red-500 text-white rounded">
        Force Close
      </button>

      {/* ✅ Pass the ref from useDropdown to the parent div */}
      <div ref={dropdownRef}>
        <Dropdown.Trigger>
          <button>Options</button>
        </Dropdown.Trigger>
        
        {/* Conditionally render the menu based on the `isOpen` state from the hook */}
        {isOpen && (
          <Dropdown.Menu>
            <div>Menu controlled by the hook</div>
          </Dropdown.Menu>
        )}
      </div>
    </div>
  );
}
```
Note: When using the `useDropdown` hook, you are responsible for managing the `isOpen` state and conditionally rendering the menu. 
The parent `div` should be passed the `dropdownRef` from the hook for the outside click logic to work correctly.

</details>
