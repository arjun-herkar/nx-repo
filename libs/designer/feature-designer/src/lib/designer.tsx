import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, Button } from '@process-workflow/shared/ui';
import DOMPurify from 'dompurify';

const DesignerLayout = styled.div<{ isPreview: boolean }>`
  display: grid;
  grid-template-columns: ${(props) => (props.isPreview ? '1fr' : '300px 1fr')};
  gap: 20px;
  height: calc(100vh - 140px); /* Adjust based on header/footer height */
  transition: grid-template-columns 0.3s ease-in-out;
`;

const ComponentPanel = styled(Card)`
  padding: 20px;
  overflow-y: auto;
`;

const PanelTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
`;

const ComponentGroup = styled.div`
  margin-bottom: 25px;
`;

const GroupTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #666;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ComponentItem = styled.div<{ isDragging: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px;
  border: 2px dashed #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: grab;
  transition: all 0.3s ease;
  background: #fafafa;

  &:hover {
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.05);
    transform: translateY(-1px);
  }

  &:active {
    cursor: grabbing;
  }

  opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
`;

const ComponentIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background: #667eea;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

const CanvasArea = styled(Card)`
  position: relative;
  overflow: auto;
  padding: 0;
`;

const CanvasHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
  border-radius: 12px 12px 0 0;
`;

const CanvasContent = styled.div<{ isPreview: boolean }>`
  padding: 30px;
  min-height: 500px;
  background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 19px,
      rgba(0, 0, 0, 0.04) 20px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 19px,
      rgba(0, 0, 0, 0.04) 20px
    );
  position: relative;

  ${(props) =>
    props.isPreview &&
    css`
      display: flex;
      flex-wrap: wrap;
      gap: 1.25rem; /* 20px */
      align-items: flex-start;
    `}
`;

const DropZone = styled.div`
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  color: #666;
  font-size: 16px;
  transition: all 0.3s ease;
`;

const DraggedComponentWrapper = styled.div`
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: relative;

  &:hover {
    .remove-btn {
      opacity: 1;
    }
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: #e0e0e0;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  color: #666;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;

  &:hover {
    background: #d0d0d0;
    color: #333;
  }
`;

const ItemTypes = {
  COMPONENT: 'component',
};

const ComponentSettingsWrapper = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SettingRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-size: 12px;
    font-weight: 500;
    color: #666;
  }

  input[type='text'] {
    width: 100%;
    padding: 6px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }

  label > input[type='checkbox'] {
    margin-right: 5px;
  }
`;

const RequiredIndicator = styled.span`
  color: #e53e3e;
  margin-left: 4px;
  font-weight: bold;
`;

const RichTextToolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: -1px;
  padding: 6px;
  background: #f8f9fa;
  border-radius: 4px 4px 0 0;
  border: 1px solid #ddd;
  border-bottom: none;
`;

const ToolbarButton = styled.button`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 4px 8px;
  cursor: pointer;
  &:hover {
    background: #e0e0e0;
  }
`;

const EditableDiv = styled.div`
  border: 1px solid #ddd;
  border-radius: 0 0 4px 4px;
  padding: 10px;
  min-height: 100px;
  background: #fff;
  outline: none;
  &:focus {
    border-color: #667eea;
  }
`;

interface Component {
  type: string;
  name: string;
  icon: string;
}

interface CanvasComponent {
  id: number;
  type: string;
  children?: CanvasComponent[];
  content?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

const componentList = [
  {
    title: 'Form Elements',
    items: [
      { type: 'text-input', icon: 'T', name: 'Text Input' },
      { type: 'rich-text', icon: 'R', name: 'Rich Text' },
      { type: 'checkbox', icon: '✓', name: 'Checkbox' },
      { type: 'radio', icon: '○', name: 'Radio Button' },
      { type: 'dropdown', icon: '▼', name: 'Dropdown' },
    ],
  },
  {
    title: 'Layout',
    items: [
      { type: 'container', icon: '□', name: 'Container' },
      { type: 'divider', icon: '—', name: 'Divider' },
    ],
  },
  {
    title: 'Content',
    items: [
      { type: 'heading', icon: 'H', name: 'Heading' },
      { type: 'paragraph', icon: 'P', name: 'Paragraph' },
    ],
  },
];

const DraggableComponent: React.FC<Component> = ({ type, name, icon }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.COMPONENT,
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <ComponentItem ref={drag} isDragging={isDragging}>
      <ComponentIcon>{icon}</ComponentIcon>
      {name}
    </ComponentItem>
  );
};

const StyledDroppableContainer = styled.div<{
  isPreview: boolean;
  isOver: boolean;
}>`
  border: ${(props) => (props.isPreview ? '1px solid #eee' : '2px dashed #ccc')};
  padding: 20px;
  border-radius: 4px;
  min-height: 100px;
  background: ${(props) =>
    props.isOver && !props.isPreview ? 'rgba(102, 126, 234, 0.05)' : 'transparent'};

  ${(props) =>
    props.isPreview &&
    css`
      display: flex;
      flex-wrap: wrap;
      gap: 1.25rem;
      align-items: flex-start;
    `}
`;

const DroppableContainer: React.FC<{
  component: CanvasComponent;
  onAddComponent: (type: string, parentId: number) => void;
  onRemove: (id: number) => void;
  onContentChange: (id: number, content: string) => void;
  onUpdateProperties: (id: number, newProps: Partial<CanvasComponent>) => void;
  isPreview: boolean;
}> = ({ component, onAddComponent, onRemove, onContentChange, onUpdateProperties, isPreview }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.COMPONENT,
    drop: (item: { type: string }) => {
      onAddComponent(item.type, component.id);
      // By returning an object, we signal that the drop has been handled
      // and the event should not bubble up to parent drop targets.
      return { handled: true };
    }, 
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <StyledDroppableContainer
      ref={isPreview ? undefined : drop}
      isPreview={isPreview}
      isOver={isOver}
    >
      {component.children && component.children.length > 0 ? (
        component.children.map((child) => (
          <CanvasItem
            key={child.id}
            component={child}
            onRemove={onRemove}
            onAddComponent={onAddComponent}
            onContentChange={onContentChange}
            onUpdateProperties={onUpdateProperties}
            isPreview={isPreview}
          />
        ))
      ) : (
        <span style={{ color: '#666' }}>Container - Drop components here</span>
      )}
    </StyledDroppableContainer>
  );
};

const RichTextEditor: React.FC<{
  component: CanvasComponent;
  onContentChange: (id: number, content: string) => void;
  isPreview: boolean;
}> = ({ component, onContentChange, isPreview }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const handleCommand = (command: string) => {
    document.execCommand(command, false);
    editorRef.current?.focus();
  };

  const handleBlur = () => {
    if (editorRef.current) {
      const unsafeHtml = editorRef.current.innerHTML;
      const safeHtml = DOMPurify.sanitize(unsafeHtml);
      if (unsafeHtml !== safeHtml) {
        editorRef.current.innerHTML = safeHtml;
      }
      onContentChange(component.id, safeHtml);
    }
  };

  if (isPreview) {
    return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(component.content || '') }} />;
  }

  return (
    <div>
      <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Rich Text Editor</label>
      <RichTextToolbar>
        <ToolbarButton onMouseDown={e => { e.preventDefault(); handleCommand('bold'); }}><b>B</b></ToolbarButton>
        <ToolbarButton onMouseDown={e => { e.preventDefault(); handleCommand('italic'); }}><i>I</i></ToolbarButton>
        <ToolbarButton onMouseDown={e => { e.preventDefault(); handleCommand('underline'); }}><u>U</u></ToolbarButton>
        <ToolbarButton onMouseDown={e => { e.preventDefault(); handleCommand('insertUnorderedList'); }}>• List</ToolbarButton>
      </RichTextToolbar>
      <EditableDiv
        ref={editorRef}
        contentEditable={!isPreview}
        suppressContentEditableWarning
        onBlur={handleBlur}
        dangerouslySetInnerHTML={{ __html: component.content || '' }}
      />
    </div>
  );
};

const CanvasItem: React.FC<{
  component: CanvasComponent;
  onRemove: (id: number) => void;
  onAddComponent: (type: string, parentId: number) => void;
  onContentChange: (id: number, content: string) => void;
  onUpdateProperties: (id: number, newProps: Partial<CanvasComponent>) => void;
  isPreview: boolean;
}> = ({ component, onRemove, onAddComponent, onContentChange, onUpdateProperties, isPreview }) => {
  const renderPreviewContent = () => {
    const { label, placeholder, required, content, type } = component;
    const requiredIndicator = required ? <RequiredIndicator>*</RequiredIndicator> : null;

    switch (type) {
      case 'text-input':
        return (
          <div>
            <label>{label}{requiredIndicator}</label>
            <input type="text" placeholder={placeholder} style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
          </div>
        );
      case 'rich-text':
        return (
          <div>
            <label>{label}{requiredIndicator}</label>
            <div style={{ border: '1px solid #ddd', padding: '10px', minHeight: '100px', background: '#fff', marginTop: '4px' }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content || '') }} />
          </div>
        );
      case 'checkbox':
        return <label><input type="checkbox" /> {label}{requiredIndicator}</label>;
      case 'radio':
        return <label><input type="radio" name={`radio-group-${component.id}`} /> {label}{requiredIndicator}</label>;
      case 'dropdown':
        return (
          <div>
            <label>{label}{requiredIndicator}</label>
            <select style={{ width: '100%', padding: '8px', marginTop: '4px' }}><option>{placeholder || 'Select...'}</option></select>
          </div>
        );
      case 'container':
        return <DroppableContainer component={component} onAddComponent={onAddComponent} onRemove={onRemove} onContentChange={onContentChange} onUpdateProperties={onUpdateProperties} isPreview={isPreview} />;
      case 'heading':
        return <h2>{label}</h2>;
      case 'paragraph':
        return <p>{label}</p>;
      case 'divider':
        return <hr />;
      default:
        return <div>{label || type}</div>;
    }
  };

  const renderEditContent = () => {
    // This is what shows inside the designer canvas before preview
    switch (component.type) {
      case 'text-input':
        return <input type="text" placeholder={component.placeholder || 'Text Input'} value={component.label} readOnly style={{ width: '100%', padding: '8px', background: '#f9f9f9' }} />;
      case 'rich-text':
        return <RichTextEditor component={component} onContentChange={onContentChange} isPreview={isPreview} />;
      case 'checkbox':
        return <label><input type="checkbox" disabled /> {component.label}</label>;
      case 'radio':
        return <label><input type="radio" name={`radio-group-edit-${component.id}`} disabled /> {component.label}</label>;
      case 'dropdown':
        return <select style={{ width: '100%', padding: '8px' }} disabled><option>{component.placeholder || 'Dropdown'}</option></select>;
      case 'container':
        return <DroppableContainer component={component} onAddComponent={onAddComponent} onRemove={onRemove} onContentChange={onContentChange} onUpdateProperties={onUpdateProperties} isPreview={isPreview} />;
      case 'heading':
        return <h2>{component.label || 'Heading'}</h2>;
      case 'paragraph':
        return <p>{component.label || 'This is a paragraph.'}</p>;
      case 'divider':
        return <hr />;
      default:
        return <div>{component.type}</div>;
    }
  }

  if (isPreview) {
    // In preview mode, each item should have some basic layout spacing.
    // The flexbox `gap` on the parent container handles this well for most cases.
    // For block-level elements, we ensure they take up the full width.
    const isBlock = [
      'text-input', 'rich-text', 'dropdown', 'container',
      'heading', 'paragraph', 'divider'
    ].includes(component.type);

    return <div style={{ width: isBlock ? '100%' : 'auto' }}>{renderPreviewContent()}</div>;
  }

  return (
    <DraggedComponentWrapper key={component.id}>
      {renderEditContent()}
      <ComponentSettings component={component} onUpdate={onUpdateProperties} />
      <RemoveButton className="remove-btn" onClick={() => onRemove(component.id)}>×</RemoveButton>
    </DraggedComponentWrapper>
  );
};

const ComponentSettings: React.FC<{
  component: CanvasComponent;
  onUpdate: (id: number, newProps: Partial<CanvasComponent>) => void;
}> = ({ component, onUpdate }) => {
  const { id, type, label, placeholder, required } = component;

  const handleUpdate = (prop: keyof Omit<CanvasComponent, 'id' | 'type' | 'children'>, value: any) => {
    onUpdate(id, { [prop]: value });
  };

  const hasLabel = !['container', 'divider', 'rich-text'].includes(type);
  const hasPlaceholder = ['text-input', 'dropdown'].includes(type);
  const isContent = ['heading', 'paragraph'].includes(type);
  const canBeRequired = !['container', 'divider', 'heading', 'paragraph'].includes(type);

  return (
    <ComponentSettingsWrapper>
      {hasLabel && (
        <SettingRow>
          <label htmlFor={`label-${id}`}>{isContent ? 'Content' : 'Label'}</label>
          <input id={`label-${id}`} type="text" value={label || ''} onChange={(e) => handleUpdate('label', e.target.value)} />
        </SettingRow>
      )}
      {hasPlaceholder && (
        <SettingRow>
          <label htmlFor={`placeholder-${id}`}>Placeholder</label>
          <input id={`placeholder-${id}`} type="text" value={placeholder || ''} onChange={(e) => handleUpdate('placeholder', e.target.value)} />
        </SettingRow>
      )}
      {canBeRequired && (
        <SettingRow>
          <label>
            <input type="checkbox" checked={!!required} onChange={(e) => handleUpdate('required', e.target.checked)} />
            Required
          </label>
        </SettingRow>
      )}
    </ComponentSettingsWrapper>
  );
};

function DesignerComponent() {
  const [canvasComponents, setCanvasComponents] = useState<CanvasComponent[]>([]);
  const [isPreview, setIsPreview] = useState(false);

  const addComponentToCanvas = (componentType: string, parentId: number | null = null) => {
    const newComponent: CanvasComponent = {
      id: Date.now(),
      type: componentType,
      children: [],
      label: `New ${componentType.replace('-', ' ')}`,
      placeholder: '',
      required: false,
      content: componentType === 'rich-text' ? '<p>Initial content...</p>' : '',
    };

    if (parentId === null) {
      setCanvasComponents((prev) => [...prev, newComponent]);
    } else {
      const updateTree = (nodes: CanvasComponent[]): CanvasComponent[] => {
        return nodes.map((node) => {
          if (node.id === parentId) {
            return { ...node, children: [...(node.children || []), newComponent] };
          }
          if (node.children) {
            return { ...node, children: updateTree(node.children) };
          }
          return node;
        });
      };
      setCanvasComponents((prev) => updateTree(prev));
    }
  };

  const removeComponentFromCanvas = (id: number) => {
    const filterTree = (nodes: CanvasComponent[]): CanvasComponent[] => {
      return nodes
        .filter((node) => node.id !== id)
        .map((node) => {
          if (node.children) {
            return { ...node, children: filterTree(node.children) };
          }
          return node;
        });
    };
    setCanvasComponents((prev) => filterTree(prev));
  };

  const updateComponentContent = (id: number, content: string) => {
    const updateNode = (nodes: CanvasComponent[]): CanvasComponent[] => {
      return nodes.map(node => {
        if (node.id === id) {
          return { ...node, content };
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    };
    setCanvasComponents(prev => updateNode(prev));
  };

  const updateComponentProperties = (id: number, newProps: Partial<CanvasComponent>) => {
    const updateNode = (nodes: CanvasComponent[]): CanvasComponent[] => {
      return nodes.map(node => {
        if (node.id === id) {
          return { ...node, ...newProps };
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    };
    setCanvasComponents(prev => updateNode(prev));
  };

  const handleSave = () => {
    console.log('Saving template structure:', JSON.stringify(canvasComponents, null, 2));
    alert('Template structure has been logged to the console!');
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.COMPONENT,
    // Pass null explicitly to signify a drop on the root canvas
    drop: (item: { type: string }, monitor) => {
      // If a nested drop target has already handled the drop, do nothing.
      if (monitor.didDrop()) {
        return;
      }
      addComponentToCanvas(item.type, null);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <DesignerLayout isPreview={isPreview}>
      {!isPreview && (
        <ComponentPanel>
          <PanelTitle>Components</PanelTitle>
          {componentList.map((group) => (
            <ComponentGroup key={group.title}>
              <GroupTitle>{group.title}</GroupTitle>
              {group.items.map((item) => (
                <DraggableComponent key={item.type} {...item} />
              ))}
            </ComponentGroup>
          ))}
        </ComponentPanel>
      )}
      <CanvasArea>
        <CanvasHeader>
          <h3>Form Designer</h3>
          <div>
            <Button
              variant="secondary"
              style={{ marginRight: '10px' }}
              onClick={() => setIsPreview(!isPreview)}
            >
              {isPreview ? 'Edit' : 'Preview'}
            </Button>
            <Button variant="primary" onClick={handleSave}>Save</Button>
          </div>
        </CanvasHeader>
        <CanvasContent ref={drop} isPreview={isPreview}>
          {canvasComponents.length === 0 ? (
            <DropZone style={{ borderColor: isOver ? '#667eea' : '#ccc' }}>
              Drag components here to build your form
            </DropZone>
          ) : (
            canvasComponents.map((component) =>
              <CanvasItem key={component.id} component={component} onRemove={removeComponentFromCanvas} onAddComponent={addComponentToCanvas} onContentChange={updateComponentContent} onUpdateProperties={updateComponentProperties} isPreview={isPreview} />
            )
          )}
        </CanvasContent>
      </CanvasArea>
    </DesignerLayout>
  );
}

export function Designer() {
  return (
    <DndProvider backend={HTML5Backend}>
      <DesignerComponent />
    </DndProvider>
  );
}

export default Designer;