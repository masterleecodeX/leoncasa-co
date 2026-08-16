const fs = require('fs');
let content = fs.readFileSync('src/components/ui/footer-section.tsx', 'utf8');

const targetAnimation = `	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);`;

const replacementAnimation = `	return (
		<div className={className}>
			{children}
		</div>
	);`;

content = content.replace(targetAnimation, replacementAnimation);

fs.writeFileSync('src/components/ui/footer-section.tsx', content);
