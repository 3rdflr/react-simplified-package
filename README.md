# react simplified package

 Lightweight component for React applications.

 ## Install

```js

npm install react-simplified-package

```

## Features/Useage

### Modal

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

#### Multiple Modals

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
