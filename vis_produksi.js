function PlotProduksi() {
    Plotly.d3.csv( "dataframe/produksi_sawit.csv", function(err, rows) {

        if(err) {
            console.error(err);
            return;
        }

        console.log(rows)

        const clean = rows.map( val => ({
            prov : val['Provinsi'],
            prod : parseFloat( val['Kelapa Sawit'] )
        }))
            .filter( r => r.prov !== 'INDONESIA' && !isNaN(r.prod))
            .sort( (a,b) => b.prod - a.prod );

        console.log(clean)

        const provinsi = clean.map( r => r.prov);
        const produksi = clean.map( r => r.prod);

        const calculate_median = (arr) => {
            const sorted = [...arr].sort()
            const mid = Math.floor(sorted.length / 2);

            if( sorted.length % 2 !== 0 ) return sorted[mid];

            return ( sorted[mid] + sorted[mid-1] ) / 2 
        };

        const median = calculate_median(produksi);  
        console.log("median : " + median);


        const data = [
            {
                x : provinsi,
                y : produksi,
                type : 'bar',
                name : 'produksi sawit',
                marker : {
                    color : produksi,
                    colorscale : 'Viridis',
                }
            }
        ];

        const layout = {
            title : "produksi sawit per provinsi".toUpperCase(),
            xaxis : {title : "PROVINSI"},
            yaxis : {title : "RIBU TON".toUpperCase() },
            margin: {
                l: 150,
                r: 80,
                b: 150,
                t: 80
            }
        };

        Plotly.newPlot("test",data, layout, {responsive: true} );
    });
}
