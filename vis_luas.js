function PlotLuas() {
    Promise.all([

        new Promise((resolve, reject) => {
            Plotly.d3.csv("dataframe/produksi_sawit.csv", (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        }),

        new Promise((resolve, reject) => {
            Plotly.d3.csv("dataframe/luas_sawit.csv", (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        })

    ]).then( ([produk_df, luas_df]) => {


        const clean_produk = produk_df.map( (row, idx) => ( {
            prov : row['Provinsi'],
            prod : parseFloat( row['Kelapa Sawit'] ),
            luas : parseFloat( luas_df[idx]['Kelapa Sawit'])
        } ) )
            .filter( r => r.prov !== 'INDONESIA' && !isNaN(r.prod) )
            .sort( (a,b) => (b.prod ) - ( a.prod ) );

        console.log(clean_produk)

        const provinsi = clean_produk.map(r => r.prov);
        const luas_lahan = clean_produk.map( r => r.luas);

        const data = [{
            x : provinsi,
            y : luas_lahan,
            type : 'bar',
            name : 'luas lahan sawit',
            marker : {
                color : luas_lahan,
                colorscale : 'Viridis'
            }
        }];

        const layout = {
            title : 'luas lahan kelapa sawit per provinsi'.toUpperCase(),
            xaxis : {title : 'PROVINSI'},
            yaxis : {title : 'JUMLAH TON/HEKTAR'},
            margin: {
                l: 150,
                r: 80,
                b: 150,
                t: 80
            }
        }

        Plotly.newPlot('test', data, layout, {responsive: true});

    } ).catch( err => console.error(err) );
}


