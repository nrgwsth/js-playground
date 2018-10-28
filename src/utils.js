function parseYAMLContent(s){
	const ret = {}
	while(s!=null && s!==""){
		s = s.trim()
		const match = s.match(/([^=\s]+)=([^=\s]+)/)
		if(match){
            s = s.slice(match.index + match[0].length, s.length)
			ret[match[1]] = match[2]
        } else{
			return ret
		}
	}
	return ret
}

function parseYAMLMetaInfo(yamlMetaString){
	const KeyValueMatchingRegex = /([\w ]+)=([\w ]+)/
	const ret = {}
	yamlMetaString = yamlMetaString.trim()
	for(let match = yamlMetaString.match(KeyValueMatchingRegex); match != null;
			match = yamlMetaString.match(KeyValueMatchingRegex)){
		ret[match[1]] = match[2].trim()
		yamlMetaString = yamlMetaString.slice(match.index + match[0].length)
	}
	return ret
}

function parseFileContent(content){
	// -------
	// title=Variable Decalration
	// section=Basics
	// created=134234221
	// -------


	// knefwfnknwenfknwkef wnefkwnekfjn wenfkjwenkfn wefnkjwenkf wkjenfkjwef


	// ```javascript
	// var a;
	// ```

	const MetaAndContentCaptureRegex = /===\s*([\w\s=?,\.,]+)\s*===([\s\S]*)/
	const match = content.match(MetaAndContentCaptureRegex)
	const config = parseYAMLMetaInfo(match[1])
	let contentString = match[2]
	const CodeBlockString = /```javascript([^`][^`][^`]*)```/
	const blocks = []
	for(let match = contentString.match(CodeBlockString); match != null; match = contentString.match(CodeBlockString)){
		const stringBlock = contentString.slice(0, match.index)
		blocks.push({
			type: "md",
			value: stringBlock.trim()
		})
		contentString = contentString.slice(match.index + match[0].length)
		blocks.push({
			type: "code",
			value: match[1].trim()
		})
	}
	blocks.push({
		type: "md",
		value: contentString.trim()
	})
	return {
		config: config,
		blocks: blocks
	}
}

export function readExcercises(){
	const context = require.context('./exercises', true, /^\.\//)
	const files = context.keys()
	const fileContentMapping = files.map(file=>({
		name: file,
		...parseFileContent(require(`raw-loader!./exercises/${file.slice(2, file.length)}`))
	}))

	console.log(fileContentMapping)

	return fileContentMapping
}

export function getSectionData(exercises){
	const sectionData = exercises.reduce((acc, item, index)=>({
		...acc,
		[item.config.section]: (acc[item.config.section] || []).concat({
			value: item.config.title,
			created: item.config.created,
			index: index
		})
	}), {})
	return sectionData
}