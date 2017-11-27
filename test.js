function timeout(ms){
	return new Promise((resolve,reject)=>{
		setTimeout(resolve,ms,'done');
	})
}

timeout(10000).then((value)=>{
	console.log(value);
})