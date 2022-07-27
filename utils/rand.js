const randId = (count) => {
    const abjad = 
    '!@#$%&ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const rand = [];
    for(let i = 0;i<count;i++){
        rand.push(abjad.charAt(parseInt(Math.random()*abjad.length)))
    }
    return rand.join('');
}
module.exports = {randId}