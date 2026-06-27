export function buildWebsitePrompt(data){

return `
Analyse the company website.

Website:
${data.siteUrl}

Brand:
${data.brand}

Audience:
${data.audience}

Keywords:
${data.keywords}

Tone:
${data.tone}

Return

# Company Summary

# Products

# ICP

# Pain Points

# Competitive Advantages

# Outreach Angles

# SEO Keywords
`;

}

export function buildLinkedInPrompt(info){

return `
Using this information

${info}

Write a professional LinkedIn post.

Include

Hook

Body

CTA

5 hashtags
`;

}

export function buildTwitterPrompt(info){

return `
Using this information

${info}

Write one Twitter/X post under 280 characters.
`;

}

export function buildYoutubePrompt(info){

return `
Using this information

${info}

Generate

Title

Description

Video outline

Tags

CTA
`;

}
