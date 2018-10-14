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

export function readExcercises(){
	const context = require.context('./exercises', true, /^\.\//)
	const groupings = {}
	context.keys().forEach((filename)=>{
		if(filename.match(/\.[\w]+$/)){
			const groupingName = filename.split("/")[1]
			const fileString = require(`raw-loader!./exercises/${filename.slice(2, filename.length)}`)
			groupings[groupingName] = groupings[groupingName] || {}

			if(filename.match(/code\.js$/)){
				groupings[groupingName].code = fileString
			}
			if(filename.match(/config\.yaml$/)){
				groupings[groupingName].config = parseYAMLContent(fileString)
			}
			if(filename.match(/content\.md$/)){
				groupings[groupingName].content = fileString
			}
		}
	})

	const excercises = []
	for(let key in groupings){
		const group = groupings[key]
		excercises.push(group)
	}

	excercises.sort(function(a, b){
		return a.created - b.created >= 0 ? false : true
	})

	return excercises
}