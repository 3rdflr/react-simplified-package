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
import { createToastInstance } from "./Toast";

// 1. Create a toast instance. You can create one instance and reuse it.
const toast = createToastInstance("Hello, world!");

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
import { createToastInstance } from "./Toast";

// With a simple string (most common)
const toastWithMessage = createToastInstance("Action completed successfully!");

// With a full React component
const CustomContent = () => (
  <div style={{ padding: "10px", background: "lightgreen" }}>
    <strong>Success!</strong> Your data has been saved.
  </div>
);
const toastWithComponent = createToastInstance(<CustomContent />);

// With a dynamic function
const toastWithDynamicContent = createToastInstance((message: string) => (
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
import { createToastInstance } from "./Toast";

// Default duration of 5 seconds (5000ms)
const longToast = createToastInstance("This toast lasts for 5 seconds.", {
  duration: 5000,
});

// Override the duration for a specific toast run
const shortToast = createToastInstance("This is a short toast.");

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
