const fs = require('fs');
const docx = require('docx');
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = docx;

const doc = new Document({
    sections: [
        {
            properties: {},
            children: [
                new Paragraph({
                    text: "SEO Analyzer Application Manual",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    children: [
                        new TextRun("Welcome to the SEO Analyzer Application. This comprehensive tool is designed to provide actionable insights into the SEO performance, technical health, and overall speed of any URL you supply.")
                    ]
                }),
                new Paragraph({
                    text: "Key Features",
                    heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({
                    bullet: { level: 0 },
                    children: [
                        new TextRun({ text: "Automated SEO Scans:", bold: true }),
                        new TextRun(" Scan your website across multiple metrics to determine its Google search readiness.")
                    ]
                }),
                new Paragraph({
                    bullet: { level: 0 },
                    children: [
                        new TextRun({ text: "Historical Reporting:", bold: true }),
                        new TextRun(" Access a full history of your scans through the 'My Reports' section.")
                    ]
                }),
                new Paragraph({
                    bullet: { level: 0 },
                    children: [
                        new TextRun({ text: "Premium Account Tiers:", bold: true }),
                        new TextRun(" Basic members can scan 1 website, while advanced tiers enjoy bulk site scanning features.")
                    ]
                }),
                new Paragraph({
                    text: "Getting Started",
                    heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({
                    children: [
                        new TextRun("1. "),
                        new TextRun({ text: "Sign Up / Log In:", bold: true }),
                        new TextRun(" Create your account using an email address securely encrypted by our backend.")
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun("2. "),
                        new TextRun({ text: "Select a Plan:", bold: true }),
                        new TextRun(" Navigate to Settings > My Account, or the Plans page, to select your initial tier before requesting an audit.")
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun("3. "),
                        new TextRun({ text: "Scan a URL:", bold: true }),
                        new TextRun(" Go to your Dashboard and click `New Scan +`. Enter a valid URL starting with 'http' or 'https' and hit submit.")
                    ]
                }),
                new Paragraph({
                    text: "Understanding Your Report",
                    heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({
                    children: [
                        new TextRun("Upon completion, a detailed audit breaks your score down into "),
                        new TextRun({ text: "SEO Score", bold: true }),
                        new TextRun(", "),
                        new TextRun({ text: "Technical Score", bold: true }),
                        new TextRun(", and "),
                        new TextRun({ text: "Performance Score", bold: true }),
                        new TextRun(". Sub-sections will outline precise broken links, canonical tag integrity, and Google ranking opportunities.")
                    ]
                })
            ]
        }
    ]
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync('d:/lopy/newone/seoanalyzer/maual.docx', buffer);
    console.log('Document created successfully');
});
