import { HEADER, FOOTER } from "./header.js";

// Function for compose header into layout
function mixinLayout (layout, header, body, footer) {
    return layout(header, body, footer)
  }
  
  
  // Layout component
function layout (header, body, footer) {
    return {
      view () {
        return [
          m(header),
          m(body),
          m(footer)
        ]
      }
    }
  }

  // Create main layouts
const mainLayout = mixinLayout.bind(null, layout, FOOTER, HEADER);

export default mainLayout;