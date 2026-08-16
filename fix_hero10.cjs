const fs = require('fs');
let content = fs.readFileSync('src/components/ui/hero-10.tsx', 'utf8');

// We need to add framer-motion and a typewriter effect for the title.
const importFramer = `import { motion } from 'framer-motion'`;

if (!content.includes(importFramer)) {
    content = content.replace(`import { Balancer } from 'react-wrap-balancer'`, `import { Balancer } from 'react-wrap-balancer'\nimport { motion } from 'framer-motion'`);
}

const targetTitle = `    >
      <Balancer>{title}</Balancer>
      {(titleLine2Prefix || titleHighlight) && (
        <>
          <br />
          <Balancer>
            {titleLine2Prefix && <span>{titleLine2Prefix} </span>}
            {titleHighlight && (
              <span className="text-primary">{titleHighlight}</span>
            )}
          </Balancer>
        </>
      )}
    </h1>`;

const replacementTitle = `    >
      <Balancer>
        {title.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.05, delay: index * 0.05 }}
            >
              {char}
            </motion.span>
        ))}
      </Balancer>
      {(titleLine2Prefix || titleHighlight) && (
        <>
          <br />
          <Balancer>
            {titleLine2Prefix && (
                titleLine2Prefix.split('').map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.05, delay: (title.length * 0.05) + (index * 0.05) }}
                    >
                      {char}
                    </motion.span>
                ))
            )}
            {titleLine2Prefix && <span> </span>}
            {titleHighlight && (
                titleHighlight.split('').map((char, index) => (
                    <motion.span
                      key={index}
                      className="text-primary"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.05, delay: (title.length * 0.05) + (titleLine2Prefix ? titleLine2Prefix.length * 0.05 : 0) + (index * 0.05) }}
                    >
                      {char}
                    </motion.span>
                ))
            )}
          </Balancer>
        </>
      )}
    </h1>`;

content = content.replace(targetTitle, replacementTitle);
fs.writeFileSync('src/components/ui/hero-10.tsx', content);
